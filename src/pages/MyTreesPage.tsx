import { VStack, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TreeAPI from '@/api/tree';
import useSession from '@/hooks/useSession';
import { TreeType } from '@/types/tree';
import TreeCard from '@/components/TreeCard';
import useConfirmDialog from '@/hooks/useConfirmDialog';
import { toaster } from '@/components/ui/toaster';
import OrnamentAPI from '@/api/ornaments';
import { EmptyState } from '@/components/ui/empty-state';
import { RiBracketsLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import PageLayout from '@/components/PageLayout';

const MyTreesPage = () => {
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

  const handleDelete = async (treeId: string) => {
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
  };

  const handleEdit = async (treeId: string, name: string, description: string | null) => {
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
  };

  return (
    <PageLayout headerProps={{ title: '내 트리 관리' }} containerProps={{ maxW: 'sm' }} isLoading={isLoading}>
      <VStack gap={4} width="100%" flex={1} overflowY="auto">
        {trees.length === 0 ? (
          <Center flex={1}>
            <EmptyState
              icon={<RiBracketsLine />}
              title="아직 만든 트리가 없어요"
              description="트리를 만들어 장식을 꾸며보세요!"
            >
              <Button width="100%" onClick={() => navigate(ROUTES.create)} _icon={{ boxSize: 4 }}>
                트리 만들기
                <IoMdAdd />
              </Button>
            </EmptyState>
          </Center>
        ) : (
          trees.map((tree) => <TreeCard key={tree.id} tree={tree} onDelete={handleDelete} onEdit={handleEdit} />)
        )}
      </VStack>
    </PageLayout>
  );
};

export default MyTreesPage;
