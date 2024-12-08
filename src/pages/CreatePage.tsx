import { Container, Heading, Input, Stack } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/UserMenu';
import BackButton from '@/components/BackButton';
import useCreatePage from '@/hooks/logic/useCreatePage';

const CreatePage = () => {
  const { onSubmit, isSubmitting } = useCreatePage();
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

      <form
        onSubmit={onSubmit}
        onChange={(e) => {
          e.currentTarget
            .querySelector('button[type="submit"]')
            ?.toggleAttribute('disabled', !e.currentTarget?.checkValidity?.());
        }}
        style={{ width: '100%' }}
      >
        <Stack gap={4} w="full">
          <Input name="treeName" placeholder="트리 이름" required />
          <Input name="description" placeholder="트리 설명 (선택사항)" />

          <Button colorScheme="green" loading={isSubmitting} width="full" type="submit" disabled>
            트리 만들기 <LuArrowRight />
          </Button>
        </Stack>
      </form>
      <UserMenu />
      <BackButton />
    </Container>
  );
};

export default CreatePage;
