import { useCallback, useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { ornamentsAtom, showTriangleAtom, treeStateAtom } from '@/store/atoms';
import { TREE_HEIGHT_RATIO, TREE_ASPECT_RATIO } from '@/constants/ui';
import OrnamentAPI from '@/api/ornaments';
import { parseOrnament } from '@/utils/ornament';
import { debounce } from '@/utils/debounce';
import { toaster } from '@/components/ui/toaster';
import useFullScreen from '@/hooks/util/useFullScreen';
import useCheckTreeId from '@/hooks/useCheckTreeId';
import { useAnimationQueue } from '../useAnimationQueue';
import TreeStatesAPI from '@/api/treeStates';

const calculateTreeDimensions = () => ({
  treeHeight: window.innerHeight * TREE_HEIGHT_RATIO,
  treeWidth: (window.innerHeight * TREE_HEIGHT_RATIO) / TREE_ASPECT_RATIO,
});

const useTreePage = () => {
  const { treeId, isValidTreeId, isLoading } = useCheckTreeId();
  const { toggleFullScreen } = useFullScreen();
  const [dimensions, setDimensions] = useState(calculateTreeDimensions);

  const [ornaments, setOrnaments] = useAtom(ornamentsAtom);
  const [treeState, setTreeState] = useAtom(treeStateAtom);
  const showTriangle = useAtomValue(showTriangleAtom);

  const { addToQueue } = useAnimationQueue(
    (ornament) => setOrnaments((prev) => [...prev, ornament]),
    !treeState?.showTitle,
  );

  const initializeOrnaments = useCallback(async () => {
    if (!treeId) return;

    try {
      const data = await OrnamentAPI.getOrnamentsByTreeId(treeId);
      setOrnaments(data);
    } catch (error) {
      toaster.error({
        title: '불러오는 중에 문제가 발생했어요',
        description: error instanceof Error ? error.message : '알 수 없는 오류',
      });
      console.error('Error loading ornaments:', error);
    }
  }, [treeId]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions(calculateTreeDimensions());
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  useEffect(() => {
    if (!isValidTreeId || !treeId) return;

    initializeOrnaments();
    const channel = OrnamentAPI.subscribeToOrnaments(treeId, (newOrnament) => {
      const parsedOrnament = parseOrnament(newOrnament);
      addToQueue(parsedOrnament);
    });

    return () => {
      channel?.unsubscribe();
    };
  }, [isValidTreeId, treeId]);

  useEffect(() => {
    if (!treeId) return;

    const channel = TreeStatesAPI.subscribeToTreeState(treeId, (newState) => {
      setTreeState(newState);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [treeId]);

  return {
    ...dimensions,
    toggleFullScreen,
    ornaments,
    isValidTreeId,
    isLoading,
    treeId,
    treeState,
    showTriangle,
  };
};

export default useTreePage;
