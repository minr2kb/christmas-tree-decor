import { treeStateAtom } from '@/store/atoms';
import { TreeState } from '@/types/tree';
import TreeStatesAPI from '@/api/treeStates';
import { useAtom } from 'jotai';
import { toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';

const useTreeStates = (treeId?: string) => {
  const [treeState, setTreeState] = useAtom(treeStateAtom);

  const updateTreeState = async (update: Partial<Omit<TreeState, 'id' | 'treeId'>>) => {
    if (!treeId) return;
    try {
      await TreeStatesAPI.updateTreeState(treeId, update);
      setTreeState((prev) => (prev ? { ...prev, ...update } : null));
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '트리 상태를 업데이트하는데 실패했습니다',
        description: '잠시 후 다시 시도해주세요',
      });
    }
  };

  useEffect(() => {
    if (!treeId) return;
    console.log('initializeTreeState');

    const initializeTreeState = async () => {
      try {
        const state = await TreeStatesAPI.getTreeState(treeId);
        setTreeState(state);
      } catch (error) {
        console.error(error);
        toaster.error({
          title: '트리 상태를 불러오는데 실패했습니다',
          description: '잠시 후 다시 시도해주세요',
        });
      }
    };

    initializeTreeState();

    const channel = TreeStatesAPI.subscribeToTreeState(treeId, (newState) => {
      setTreeState(newState);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [treeId]);

  return { treeState, updateTreeState };
};

export default useTreeStates;
