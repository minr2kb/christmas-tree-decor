import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TreeAPI from '@/api/tree';
import { useSetAtom } from 'jotai';
import { treeAtom } from '@/store/atoms';

const useCheckTreeId = () => {
  const { treeId } = useParams();
  const [isValidTreeId, setIsValidTreeId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setTree = useSetAtom(treeAtom);

  useEffect(() => {
    if (!treeId) return;

    const checkTree = async () => {
      try {
        const tree = await TreeAPI.getTree(treeId);

        if (!tree) {
          throw new Error(`Tree not found with ID: ${treeId}`);
        }

        setTree(tree);
        setIsValidTreeId(true);
      } catch (err) {
        console.error(err);
        setIsValidTreeId(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkTree();
  }, [treeId]);

  return { treeId, isValidTreeId, isLoading };
};

export default useCheckTreeId;
