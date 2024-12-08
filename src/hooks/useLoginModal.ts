import { useCallback } from 'react';
import { openLoginDialogAtom } from '@/store/atoms';
import { useSetAtom } from 'jotai';

const useLoginModal = () => {
  const setOpenLoginDialog = useSetAtom(openLoginDialogAtom);

  const handleOpenLoginDialog = useCallback(() => {
    setOpenLoginDialog(true);
  }, [setOpenLoginDialog]);

  return { handleOpenLoginDialog };
};

export default useLoginModal;
