import { useEffect, useState } from 'react';
import { TREE_ASPECT_RATIO } from '@/constants/consts';
import {
  ornamentsAtom,
  animationQueueAtom,
  showCountAtom,
  showTriangleAtom,
  showSnowAtom,
  showStarAtom,
  showTitleAtom,
} from '@/store/atoms';
import useFullScreen from './useFullScreen';
import { TREE_HEIGHT_RATIO, INTERVAL_TIME } from '@/constants/consts';
import { useAtom, useAtomValue } from 'jotai';
import useInterval from './useInterval';
import { toaster } from '@/components/ui/toaster';
import useCheckTreeId from './useCheckTreeId';
import { loadOrnaments, subscribeToOrnaments } from '@/api/ornaments';
import { parseOrnament } from '@/utils/ornament';
import { debounce } from '@/utils/debounce';

const useTreePage = () => {
  const { treeId, isValidTreeId, isLoading } = useCheckTreeId();
  const { toggleFullScreen } = useFullScreen();
  const [ornaments, setOrnaments] = useAtom(ornamentsAtom);
  const [animationQueue, setAnimationQueue] = useAtom(animationQueueAtom);
  const showTriangle = useAtomValue(showTriangleAtom);
  const showCount = useAtomValue(showCountAtom);
  const showSnow = useAtomValue(showSnowAtom);
  const showStar = useAtomValue(showStarAtom);
  const showTitle = useAtomValue(showTitleAtom);

  const [dimensions, setDimensions] = useState({
    treeHeight: window.innerHeight * TREE_HEIGHT_RATIO,
    treeWidth: (window.innerHeight * TREE_HEIGHT_RATIO) / TREE_ASPECT_RATIO,
  });

  const initializeOrnaments = async () => {
    try {
      const data = await loadOrnaments(treeId!);
      setOrnaments(data);
    } catch (error) {
      toaster.error({
        title: '불러오는 중에 문제가 발생했어요',
        description: error instanceof Error ? error.message : '알 수 없는 오류',
      });
      console.error('Error loading ornaments:', error);
    }
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        treeHeight: window.innerHeight * TREE_HEIGHT_RATIO,
        treeWidth: (window.innerHeight * TREE_HEIGHT_RATIO) / TREE_ASPECT_RATIO,
      });
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  const { treeHeight, treeWidth } = dimensions;

  useEffect(() => {
    if (!isValidTreeId) return;
    if (!treeId) return;

    initializeOrnaments();
    const channel = subscribeToOrnaments(treeId, (newOrnament) => {
      setAnimationQueue((prev) => [...prev, parseOrnament(newOrnament)]);
    });

    return () => {
      channel?.unsubscribe();
    };
  }, [isValidTreeId, treeId]);

  useInterval(
    () => {
      setAnimationQueue((queue) => {
        if (queue.length === 0) return queue;
        const [next, ...rest] = queue;
        setOrnaments((prev) => [...prev, { ...next, animated: true }]);
        return rest;
      });
    },
    animationQueue.length > 0 && !showTitle ? INTERVAL_TIME : null,
  );

  return {
    toggleFullScreen,
    ornaments,
    showTriangle,
    showCount,
    showSnow,
    showStar,
    treeHeight,
    treeWidth,
    isValidTreeId,
    isLoading,
    treeId,
  };
};

export default useTreePage;
