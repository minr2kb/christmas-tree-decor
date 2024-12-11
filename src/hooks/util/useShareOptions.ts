import { useMemo } from 'react';
import { toaster } from '@/components/ui/toaster';
import QRCode from 'qrcode';
import { logger } from '@/utils/logger';

export default function useShareOptions(treeId?: string) {
  return useMemo(
    () => ({
      generateQR: () => {
        if (!treeId) return;
        QRCode.toDataURL(`${window.location.origin}/send/${treeId}`, {
          width: 256,
          margin: 1,
        }).then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `tree-${treeId}-qr.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toaster.success({ title: 'QR코드가 다운로드되었습니다' });
          logger.info('QR code generated', { treeId });
        });
      },
      copySendLink: () => {
        if (!treeId) return;
        navigator.clipboard.writeText(`${window.location.origin}/send/${treeId}`);
        toaster.success({ title: '클립보드에 복사되었습니다' });
        logger.info('Send link copied', { treeId });
      },
    }),
    [treeId],
  );
}
