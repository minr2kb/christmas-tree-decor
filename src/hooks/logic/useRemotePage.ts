import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { treeStateAtom, treeAtom } from '@/store/atoms';
import useCheckTreeId from '@/hooks/useCheckTreeId';
import useSession from '@/hooks/useSession';
import TreeStatesAPI from '@/api/treeStates';
import { TreeState } from '@/types/tree';
import { toaster } from '@/components/ui/toaster';

const useRemotePage = () => {
  const { treeId, isValidTreeId, isLoading } = useCheckTreeId();
  const { isAuthenticated, user } = useSession();
  const tree = useAtomValue(treeAtom);
  const [treeState, setTreeState] = useAtom(treeStateAtom);
  const isOwner = tree?.userId === user?.id;

  useEffect(() => {
    if (!treeId) return;

    const channel = TreeStatesAPI.subscribeToTreeState(treeId, (newState) => {
      setTreeState(newState);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [treeId]);

  const handleToggleState = async (key: keyof TreeState) => {
    if (!treeId || !isOwner) return;

    try {
      await TreeStatesAPI.updateTreeState(treeId, {
        [key]: !treeState?.[key],
      });
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '상태 업데이트 실패',
        description: '잠시 후 다시 시도해주세요',
      });
    }
  };

  const getErrorMessage = () => {
    if (!isAuthenticated) return '로그인이 필요해요';
    if (!isValidTreeId) return '트리를 찾을 수 없어요';
    if (!isOwner) return '트리 소유자가 아니에요';
    return '알 수 없는 오류';
  };

  return {
    tree,
    isValidTreeId,
    isLoading,
    isOwner,
    treeState,
    handleToggleCount: () => handleToggleState('showCount'),
    handleToggleSnow: () => handleToggleState('showSnow'),
    handleToggleStar: () => handleToggleState('showStar'),
    handleToggleTitle: () => handleToggleState('showTitle'),
    getErrorMessage,
  };
};

export default useRemotePage;
