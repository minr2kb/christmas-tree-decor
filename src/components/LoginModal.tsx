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
import { openLoginDialogAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { Provider } from '@/types/auth';
import { signInWithProvider } from '@/api/auth';
import { FcGoogle } from 'react-icons/fc';
import { Icon, Stack } from '@chakra-ui/react';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { toaster } from './ui/toaster';

const LoginModal = () => {
  const [openLoginDialog, setOpenLoginDialog] = useAtom(openLoginDialogAtom);
  const from = window.location.pathname;

  const handleLogin = async (provider: Provider) => {
    try {
      await signInWithProvider(provider, from);
      await signInWithProvider(provider, from);
    } catch (error) {
      toaster.error({
        title: '로그인 실패',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요',
      });
    }
  };

  return (
    <DialogRoot
      key={'login-modal'}
      placement={'center'}
      motionPreset="slide-in-bottom"
      size={'xs'}
      lazyMount
      open={!!openLoginDialog}
      onOpenChange={(e) => setOpenLoginDialog(e.open ? openLoginDialog : false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Stack gap={2}>
            <DialogActionTrigger asChild>
              <Button
                w="full"
                bgColor="white"
                _hover={{ bgColor: 'whiteAlpha.700' }}
                onClick={() => handleLogin('google')}
              >
                Google로 계속하기
                <Icon>
                  <FcGoogle />
                </Icon>
              </Button>
            </DialogActionTrigger>

            <DialogActionTrigger asChild>
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
            </DialogActionTrigger>
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default LoginModal;
