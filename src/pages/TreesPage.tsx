import { Heading, Text, VStack, Container, Spinner, Center } from '@chakra-ui/react';
import UserMenu from '@/components/UserMenu';
import { useEffect, useState } from 'react';
import TreeAPI from '@/api/tree';
import useSession from '@/hooks/useSession';
import { TreeType } from '@/types/tree';
import TreeCard from '@/components/TreeCard';
import useConfirmDialog from '@/hooks/useConfirmDialog';
import { toaster } from '@/components/ui/toaster';
import BackButton from '@/components/BackButton';

const TreesPage = () => {
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
      <Heading fontSize="2xl">내 트리 관리</Heading>
      <Text fontSize="md" color="gray.200">
        내가 꾸며 온 트리들을 확인해보세요!
      </Text>

      <VStack gap={4} mt={5} width="100%" flex={1} overflowY="auto">
        {isLoading ? (
          <Center flex={1}>
            <Spinner />
          </Center>
        ) : trees.length === 0 ? (
          <Center flex={1}>
            <Text color="gray.500">아직 만든 트리가 없어요</Text>
          </Center>
        ) : (
          trees.map((tree) => <TreeCard key={tree.id} tree={tree} onDelete={handleDelete} />)
        )}
      </VStack>
      <UserMenu />
      <BackButton />
    </Container>
  );
};

export default TreesPage;
