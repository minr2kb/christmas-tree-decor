import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { LuArrowRight } from 'react-icons/lu';
import { createTree } from '@/api/tree';

const CreatePage = () => {
  const [treeName, setTreeName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateTree = async () => {
    if (!treeName.trim()) {
      toaster.error({
        title: '트리 이름을 입력해주세요',
      });
      return;
    }

    setIsCreating(true);
    try {
      const data = await createTree(treeName, description);
      navigate(`/tree/${data.id}`);
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '트리 생성 실패',
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Container
      maxW="xs"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      p={4}
      bgColor="bg"
    >
      <Input placeholder="트리 이름" value={treeName} onChange={(e) => setTreeName(e.target.value)} />
      <Input placeholder="트리 설명 (선택사항)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button colorScheme="green" disabled={isCreating} onClick={handleCreateTree} width="full">
        트리 만들기 <LuArrowRight />
      </Button>
    </Container>
  );
};

export default CreatePage;
