import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
  DialogActionTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { loginModalAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { Provider } from '@/types/auth';
import AuthAPI from '@/api/auth';
import { FcGoogle } from 'react-icons/fc';
import { Icon, Stack, Text } from '@chakra-ui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { toaster } from './ui/toaster';

const LoginModal = () => {
  const [loginModal, setLoginModal] = useAtom(loginModalAtom);

  const {
    title = '로그인',
    body,
    providers = ['google', 'kakao'],
    onCancel,
    redirectUrl = window.location.pathname,
  } = loginModal || {};
  const hasKakao = providers.includes('kakao');
  const hasGoogle = providers.includes('google');

  const handleLogin = async (provider: Provider) => {
    try {
      await AuthAPI.signInWithProvider(provider, redirectUrl);
    } catch (error) {
      toaster.error({
        title: '로그인 실패',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요',
      });
    }
  };

  const onClose = () => {
    setLoginModal(null);
    onCancel?.();
  };

  return (
    <DialogRoot
      key={'login-modal'}
      placement={'center'}
      motionPreset="slide-in-bottom"
      size={'xs'}
      lazyMount
      open={!!loginModal}
      onOpenChange={(e) => !e.open && onClose()}
      closeOnInteractOutside={false}
    >
      <DialogContent>
        <DialogHeader>
          <Stack gap={2}>
            <DialogTitle>{title}</DialogTitle>
            <Text>{body}</Text>
          </Stack>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Stack gap={2}>
            {hasGoogle && (
              <DialogActionTrigger asChild>
                <Button
                  w="full"
                  bgColor="white"
                  _hover={{ bgColor: 'whiteAlpha.700' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogin('google');
                  }}
                >
                  Google로 계속하기
                  <Icon>
                    <FcGoogle />
                  </Icon>
                </Button>
              </DialogActionTrigger>
            )}

            {hasKakao && (
              <DialogActionTrigger asChild>
                <Button
                  w="full"
                  bgColor="#FEE500"
                  color="black"
                  _hover={{ bgColor: '#FEE500' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogin('kakao');
                  }}
                >
                  카카오로 계속하기
                  <Icon>
                    <RiKakaoTalkFill />
                  </Icon>
                </Button>
              </DialogActionTrigger>
            )}
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default LoginModal;
