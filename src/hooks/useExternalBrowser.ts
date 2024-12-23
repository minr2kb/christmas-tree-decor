import { useEffect, useCallback } from 'react';
import { isInAppBrowser, isIOS, isKakaoTalk, isLine } from '@/utils/browser';
import { toaster } from '@/components/ui/toaster';

const useExternalBrowser = () => {
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  useEffect(() => {
    if (!isInAppBrowser()) return;

    const currentUrl = window.location.href;

    if (isKakaoTalk()) {
      // 카카오톡 외부 브라우저로 열기
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(currentUrl)}`;
    } else if (isLine()) {
      // 라인 외부 브라우저로 열기
      const separator = currentUrl.includes('?') ? '&' : '?';
      window.location.href = `${currentUrl}${separator}openExternalBrowser=1`;
    } else if (isIOS()) {
      // iOS의 경우 Safari로 열기
      copyToClipboard(currentUrl);
      toaster.success({
        title: 'Safari로 열기',
        description: 'URL이 복사되었습니다. Safari가 열리면 주소창을 길게 눌러 "붙여넣기 및 이동"을 선택해주세요.',
        duration: 5000,
      });
    } else {
      // 안드로이드의 경우 Chrome으로 열기
      window.location.href = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;
    }
  }, [copyToClipboard, toaster]);
};

export default useExternalBrowser;
