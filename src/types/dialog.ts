import { Provider } from './auth';

export type ConfirmDialogType = {
  title: string;
  body: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
};

export type LoginModalType = {
  title?: string;
  body?: string;
  providers?: Provider[];
  onCancel?: () => void;
  redirectUrl?: string;
};
