import { treeStateAtom } from '@/store/atoms';
import { TreeState } from '@/types/tree';
import TreeStatesAPI from '@/api/treeStates';
import { useAtomValue } from 'jotai';

const useTreeStates = (treeId?: string) => {
  const treeState = useAtomValue(treeStateAtom);

  const updateTreeState = (update: Partial<Omit<TreeState, 'id' | 'treeId'>>) => {
    if (!treeId) return;
    TreeStatesAPI.updateTreeState(treeId, update);
  };

  return { treeState, updateTreeState };
};

export default useTreeStates;
