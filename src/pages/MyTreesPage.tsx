import { Heading, VStack, Container, Spinner, Center } from '@chakra-ui/react';
import UserMenu from '@/components/UserMenu';
import { useEffect, useState } from 'react';
import TreeAPI from '@/api/tree';
import useSession from '@/hooks/useSession';
import { TreeType } from '@/types/tree';
import TreeCard from '@/components/TreeCard';
import useConfirmDialog from '@/hooks/useConfirmDialog';
import { toaster } from '@/components/ui/toaster';
import BackButton from '@/components/BackButton';
import OrnamentAPI from '@/api/ornaments';
import { EmptyState } from '@/components/ui/empty-state';
import { RiBracketsLine } from 'react-icons/ri';

const MyTreesPage = () => {
  const { user } = useSession();
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
    <Container
      maxW="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      p={4}
      bgColor="bg"
    >
      <Heading fontSize="xl">내 트리 관리</Heading>

      <VStack gap={4} mt={5} width="100%" flex={1} overflowY="auto">
        {isLoading ? (
          <Center flex={1}>
            <Spinner />
          </Center>
        ) : trees.length === 0 ? (
          <Center flex={1}>
            <EmptyState
              icon={<RiBracketsLine />}
              title="아직 만든 트리가 없어요"
              description="트리를 만들어 장식을 꾸며보세요!"
            />
          </Center>
        ) : (
          trees.map((tree) => <TreeCard key={tree.id} tree={tree} onDelete={handleDelete} onEdit={handleEdit} />)
        )}
      </VStack>
      <UserMenu />
      <BackButton />
    </Container>
  );
};

export default MyTreesPage;
