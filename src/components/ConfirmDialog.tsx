import { DialogRoot } from './ui/dialog';

import { DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Text } from '@chakra-ui/react';
import { confirmDialogAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { memo, useCallback } from 'react';

const ConfirmDialog = memo(() => {
  const [confirmDialog, setConfirmDialog] = useAtom(confirmDialogAtom);

  const { title, body, onConfirm, onCancel, confirmText, cancelText, isDestructive } = confirmDialog || {};

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setConfirmDialog(null);
      onCancel?.();
    },
    [onCancel, setConfirmDialog],
  );

  const handleConfirm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onConfirm?.();
    },
    [onConfirm],
  );

  const onClose = useCallback(() => {
    setConfirmDialog(null);
    onCancel?.();
  }, [onCancel, setConfirmDialog]);

  return (
    <DialogRoot
      key={'confirm-modal'}
      placement={'center'}
      motionPreset="slide-in-bottom"
      size={'xs'}
      lazyMount
      open={!!confirmDialog}
      onOpenChange={(e) => !e.open && onClose()}
      closeOnInteractOutside={false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text fontSize="md">{body}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleCancel}>
              {cancelText || '취소'}
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button colorPalette={isDestructive ? 'red' : 'fg'} onClick={handleConfirm}>
              {confirmText || '확인'}
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
});

export default ConfirmDialog;
