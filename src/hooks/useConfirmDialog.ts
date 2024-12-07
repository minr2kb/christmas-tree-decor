import { confirmDialogAtom } from '@/store/atoms';
import { ConfirmDialogType } from '@/types/dialog';
import { useSetAtom } from 'jotai';

const useConfirmDialog = () => {
  const setConfirmDialog = useSetAtom(confirmDialogAtom);
  const confirm = (dialog: ConfirmDialogType) => {
    setConfirmDialog(dialog);
  };

  return { confirm };
};

export default useConfirmDialog;
