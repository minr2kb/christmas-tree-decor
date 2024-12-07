import { Container, VStack, Text, Button, Icon } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import useAuth from '@/hooks/useAuth';
import { Provider } from '@/types/auth';
import BackButton from '@/components/BackButton';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const { signInWithProvider } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from;

  const handleLogin = async (provider: Provider) => {
    try {
      await signInWithProvider(provider, from);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container position="relative" maxW="xs" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack gap={4} w="full">
        <Text fontSize="2xl" fontWeight="bold">
          로그인
        </Text>

        <Button w="full" bgColor="white" _hover={{ bgColor: 'whiteAlpha.700' }} onClick={() => handleLogin('google')}>
          Google로 계속하기
          <Icon>
            <FcGoogle />
          </Icon>
        </Button>

        <Button
          w="full"
          bgColor="#FEE500"
          color="black"
          _hover={{ bgColor: '#FEE500' }}
          onClick={() => handleLogin('kakao')}
        >
          카카오로 계속하기
          <Icon>
            <RiKakaoTalkFill />
          </Icon>
        </Button>
      </VStack>
      <BackButton />
    </Container>
  );
};

export default LoginPage;
