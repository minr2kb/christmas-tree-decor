import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Container, Heading, Input, Stack } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { LuArrowRight } from 'react-icons/lu';
import { createTree } from '@/api/tree';

import { Button } from '@/components/ui/button';
import useSession from '@/hooks/useSession';
import UserMenu from '@/components/UserMenu';
import BackButton from '@/components/BackButton';

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  const [treeName, setTreeName] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async () => {
    if (!user) {
      return toaster.error({
        title: '로그인 후 이용 가능해요!',
      });
    }
    if (!treeName.trim()) {
      return toaster.error({
        title: '트리 이름을 입력해주세요',
      });
    }
    try {
      setIsPending(true);
      const data = await createTree(treeName, description, user.id);
      if (data) {
        navigate(`/tree/${data.id}`);
      }
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '트리 생성 실패',
        description: '잠시 후 다시 시도해주세요',
      });
    } finally {
      setIsPending(false);
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
      <Heading fontSize="xl">트리 만들기</Heading>

      <Stack gap={4} w="full">
        <Input
          name="treeName"
          placeholder="트리 이름"
          required
          value={treeName}
          onChange={(e) => setTreeName(e.target.value)}
        />
        <Input
          name="description"
          placeholder="트리 설명 (선택사항)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          colorScheme="green"
          loading={isPending}
          width="full"
          disabled={treeName.trim() === ''}
          onClick={onSubmit}
        >
          트리 만들기 <LuArrowRight />
        </Button>
      </Stack>
      <UserMenu />
      <BackButton />
    </Container>
  );
};

export default CreatePage;
