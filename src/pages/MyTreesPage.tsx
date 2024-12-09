import { VStack, Center } from '@chakra-ui/react';
import TreeCard from '@/components/TreeCard';

import { EmptyState } from '@/components/ui/empty-state';
import { RiBracketsLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { IoMdAdd } from 'react-icons/io';

import PageLayout from '@/components/PageLayout';
import useMyTreesPage from '@/hooks/logic/useMyTreesPage';

const MyTreesPage = () => {
  const { trees, isLoading, handleDelete, handleEdit, handleClickAdd } = useMyTreesPage();
  return (
    <PageLayout headerProps={{ title: '내 트리 관리' }} containerProps={{ maxW: 'sm' }} isLoading={isLoading}>
      <VStack gap={4} w="full" flex={1}>
        {trees.length === 0 && (
          <Center flex={1}>
            <EmptyState
              icon={<RiBracketsLine />}
              title="아직 만든 트리가 없어요"
              description="트리를 만들어 장식을 꾸며보세요!"
            >
              <Button w="full" onClick={handleClickAdd} _icon={{ boxSize: 4 }}>
                트리 만들기
                <IoMdAdd />
              </Button>
            </EmptyState>
          </Center>
        )}

        {trees.map((tree) => (
          <TreeCard key={tree.id} tree={tree} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </VStack>
    </PageLayout>
  );
};

export default MyTreesPage;
