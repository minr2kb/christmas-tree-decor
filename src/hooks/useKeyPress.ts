import { useCallback, useEffect } from 'react';

/**
 * 키보드 입력을 처리하는 훅
 * @param keyMap - key를 입력했을 때 실행할 함수를 정의한 객체
 */
const useKeyPress = (keyMap: Record<string, () => void>, options?: { enable?: boolean; metaKey?: boolean }) => {
  const { enable = true, metaKey = false } = options || {};
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (metaKey && !event.metaKey) return;
      const handler = keyMap[event.key];
      if (handler) handler();
    },
    [keyMap, metaKey],
  );

  useEffect(() => {
    if (!enable) return;
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, enable]);
};

export default useKeyPress;
