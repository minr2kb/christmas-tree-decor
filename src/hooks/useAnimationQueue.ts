import { useAtom } from 'jotai';
import { animationQueueAtom } from '@/store/atoms';
import { INTERVAL_TIME } from '@/constants/ui';
import { OrnamentType, OrnamentWithInitialPositionType } from '@/types/ornament';
import { getInitialPosition } from '@/utils/ornament';
import useInterval from './util/useInterval';
import { useCallback } from 'react';

export function useAnimationQueue(onProcess: (next: OrnamentWithInitialPositionType) => void, enable = true) {
  const [animationQueue, setAnimationQueue] = useAtom(animationQueueAtom);

  const addToQueue = useCallback((ornament: OrnamentType) => {
    setAnimationQueue((prev) => [...prev, ornament]);
  }, []);

  const processQueue = useCallback(() => {
    setAnimationQueue((queue) => {
      if (queue.length === 0) return queue;
      const [next, ...rest] = queue;
      const initialPosition = getInitialPosition();

      onProcess({ ...next, initialPosition });
      return rest;
    });
  }, []);

  useInterval(processQueue, animationQueue.length > 0 && enable ? INTERVAL_TIME : null);

  return {
    pendingCount: animationQueue.length,
    addToQueue,
  };
}
