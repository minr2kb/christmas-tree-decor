import { toaster } from '@/components/ui/toaster';
import { Tooltip } from '@/components/ui/tooltip';
import UserMenu from '@/components/UserMenu';
import useAuth from '@/hooks/useAuth';
import useConfirmDialog from '@/hooks/useConfirmDialog';
import useSession from '@/hooks/useSession';
import { Button, Container, Heading, Icon, Separator, Text, VStack } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { LuLogIn } from 'react-icons/lu';
import { RiQrScan2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSession();
  const { signOut } = useAuth();
  const { confirm } = useConfirmDialog();

  const handleCreateTree = () => {
    if (!isAuthenticated) {
      confirm({
        title: '로그인 후 이용 가능해요!',
        body: '로그인 후 트리를 만들어보세요',
        onConfirm: () => navigate('/login'),
        confirmText: '로그인',
      });
      return;
    }
    navigate('/create');
  };

  const handleScanTree = () => {
    navigate('/scan');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    await signOut();
    toaster.success({
      title: '로그아웃 성공',
    });
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
      <Heading fontSize="2xl">크리스마스 트리 꾸미기🎄</Heading>
      <Text fontSize="md" color="gray.200">
        실시간으로 함께 꾸미는 크리스마스 트리
      </Text>
      <VStack gap={4} mt={5} width="100%">
        <Tooltip
          content="로그인 후 이용 가능해요!"
          positioning={{ placement: 'top' }}
          showArrow
          disabled={!!isAuthenticated}
        >
          <Button width="100%" onClick={handleCreateTree}>
            새로운 트리 만들기
            <Icon boxSize={4}>
              <IoMdAdd />
            </Icon>
          </Button>
        </Tooltip>
        <Button width="100%" onClick={handleScanTree}>
          기존 트리 꾸미기
          <Icon boxSize={4}>
            <RiQrScan2Line />
          </Icon>
        </Button>
        <Separator />
        <Button variant={'subtle'} width="100%" onClick={isAuthenticated ? handleLogout : handleLogin}>
          {isAuthenticated ? '로그아웃' : '간편로그인'}
          <Icon boxSize={4}>
            <LuLogIn />
          </Icon>
        </Button>
      </VStack>
      <UserMenu />
    </Container>
  );
};

export default HomePage;
