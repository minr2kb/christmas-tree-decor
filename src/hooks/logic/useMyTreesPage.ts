import OrnamentAPI from '@/api/ornaments';
import TreeAPI from '@/api/tree';
import { toaster } from '@/components/ui/toaster';
import { useEffect, useCallback } from 'react';
import useSession from '../useSession';
import useConfirmDialog from '../useConfirmDialog';
import { useState } from 'react';
import { TreeType } from '@/types/tree';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const useMyTreesPage = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  const [trees, setTrees] = useState<TreeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { confirm } = useConfirmDialog();

  useEffect(() => {
    const loadTrees = async () => {
      if (!user) return;
      try {
        const data = await TreeAPI.getTreesByUserId(user.id);
        setTrees(data);
      } catch (error) {
        console.error(error);
        toaster.error({
          title: '트리 목록을 불러오는데 실패했습니다',
          description: '잠시 후 다시 시도해주세요',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTrees();
  }, [user]);

  const handleDelete = useCallback(
    async (treeId: string) => {
      confirm({
        title: '트리를 삭제하시겠어요?',
        body: '모든 장식도 함께 사라집니다',
        onConfirm: async () => {
          try {
            await TreeAPI.deleteTree(treeId);
            await OrnamentAPI.deleteOrnamentsByTreeId(treeId);
            setTrees((prev) => prev.filter((tree) => tree.id !== treeId));
            toaster.success({
              title: '트리를 삭제했습니다',
            });
          } catch (error) {
            console.error(error);
            toaster.error({
              title: '트리 삭제에 실패했습니다',
              description: '잠시 후 다시 시도해주세요',
            });
          }
        },
        confirmText: '삭제',
        isDestructive: true,
      });
    },
    [confirm],
  );

  const handleEdit = useCallback(
    async (treeId: string, name: string, description: string | null) => {
      try {
        await TreeAPI.updateTree(treeId, name, description);
        setTrees((prev) => prev.map((tree) => (tree.id === treeId ? { ...tree, name, description } : tree)));
        toaster.success({
          title: '트리를 수정했습니다',
        });
      } catch (error) {
        console.error(error);
        toaster.error({
          title: '트리 수정에 실패했습니다',
          description: '잠시 후 다시 시도해주세요',
        });
      }
    },
    [setTrees],
  );

  const handleClickAdd = () => {
    navigate(ROUTES.create);
  };

  return { trees, isLoading, handleDelete, handleEdit, handleClickAdd };
};

export default useMyTreesPage;
