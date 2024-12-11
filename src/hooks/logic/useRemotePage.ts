import { useCallback, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { treeAtom } from '@/store/atoms';
import useCheckTreeId from '@/hooks/useCheckTreeId';
import useSession from '@/hooks/useSession';
import { TreeState } from '@/types/tree';
import { toaster } from '@/components/ui/toaster';
import useTreeStates from '../useTreeStates';

const useRemotePage = () => {
  const { treeId, isValidTreeId, isLoading } = useCheckTreeId();
  const { isAuthenticated, user } = useSession();
  const tree = useAtomValue(treeAtom);

  const { updateTreeState, treeState } = useTreeStates(treeId);
  const isOwner = tree?.userId === user?.id;

  const handleToggleState = useCallback(
    async (key: keyof TreeState) => {
      if (!treeId || !isOwner) return;

      try {
        await updateTreeState({
          [key]: !treeState?.[key],
        });
      } catch {
        toaster.error({
          title: '상태 업데이트 실패',
          description: '잠시 후 다시 시도해주세요',
        });
      }
    },
    [treeId, isOwner, updateTreeState, treeState],
  );

  const errorMessage = useMemo(() => {
    if (!isAuthenticated) return '로그인이 필요해요';
    if (!isValidTreeId) return '트리를 찾을 수 없어요';
    if (!isOwner) return '트리 소유자가 아니에요';
    return '알 수 없는 오류';
  }, [isAuthenticated, isValidTreeId, isOwner]);

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
    errorMessage,
  };
};

export default useRemotePage;
