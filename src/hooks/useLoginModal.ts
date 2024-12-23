import { useCallback } from 'react';
import { loginModalAtom } from '@/store/atoms';
import { useSetAtom } from 'jotai';
import { LoginModalType } from '@/types/dialog';

const useLoginModal = () => {
  const setLoginModal = useSetAtom(loginModalAtom);
  //

  const openLoginModal = useCallback(
    (loginModal: LoginModalType = { providers: ['google', 'kakao'], title: '로그인' }) => {
      setLoginModal(loginModal);
    },
    [setLoginModal],
  );

  return { openLoginModal };
};

export default useLoginModal;
