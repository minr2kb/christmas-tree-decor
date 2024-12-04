import { useCallback, useEffect } from 'react';

/**
 * 키보드 입력을 처리하는 훅
 * @param keyMap - key를 입력했을 때 실행할 함수를 정의한 객체
 */
const useKeyPress = (keyMap: Record<string, () => void>) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) return;
      const handler = keyMap[event.key];
      if (handler) handler();
    },
    [keyMap],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useKeyPress;
