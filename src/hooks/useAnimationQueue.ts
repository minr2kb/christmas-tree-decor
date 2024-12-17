import { useAtom, useAtomValue } from 'jotai';
import { animationQueueAtom, ornamentsCountAtom } from '@/store/atoms';
import { POP_INTERVAL_TIME } from '@/constants/ui';
import { OrnamentType, OrnamentWithInitialPositionType } from '@/types/ornament';
import { getInitialPosition } from '@/utils/ornament';
import useInterval from './util/useInterval';
import { useCallback } from 'react';

export function useAnimationQueue(onProcess: (next: OrnamentWithInitialPositionType) => void, enable = true) {
  const ornamentsCount = useAtomValue(ornamentsCountAtom);
  const [animationQueue, setAnimationQueue] = useAtom(animationQueueAtom);

  const addToQueue = useCallback((ornament: OrnamentType) => {
    setAnimationQueue((prev) => [...prev, ornament]);
  }, []);

  const processQueue = useCallback(() => {
    setAnimationQueue((queue) => {
      if (queue.length === 0) return queue;
      const [next, ...rest] = queue;
      const initialPosition = getInitialPosition(ornamentsCount);

      onProcess({ ...next, initialPosition });
      return rest;
    });
  }, [ornamentsCount]);

  useInterval(processQueue, animationQueue.length > 0 && enable ? POP_INTERVAL_TIME : null);

  return {
    pendingCount: animationQueue.length,
    addToQueue,
  };
}
