import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTree } from '@/api/tree';
import { useSetAtom } from 'jotai';
import { treeAtom } from '@/store/atoms';
import { parseTree } from '@/utils/tree';

const useCheckTreeId = () => {
  const { treeId } = useParams();
  const [isValidTreeId, setIsValidTreeId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setTree = useSetAtom(treeAtom);

  useEffect(() => {
    if (!treeId) return;

    const checkTree = async () => {
      try {
        const tree = await getTree(treeId);

        if (!tree) {
          throw new Error(`Tree not found with ID: ${treeId}`);
        }

        setTree(parseTree(tree));
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
