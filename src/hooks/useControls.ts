import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ORNAMENT_TYPE_COUNT } from '@/constants/consts';
import { animationQueueAtom, showCountAtom, showSnowAtom, showStarAtom, showTriangleAtom } from '@/store/atoms';
import { createOrnament, getInitialPosition } from '@/utils/ornament';
import { deleteTree } from '@/api/tree';
import { toaster } from '@/components/ui/toaster';

export function useControls(treeId?: string) {
  const setAnimationQueue = useSetAtom(animationQueueAtom);
  const [showTriangle, setShowTriangle] = useAtom(showTriangleAtom);
  const [showCount, setShowCount] = useAtom(showCountAtom);
  const [showSnow, setShowSnow] = useAtom(showSnowAtom);
  const [showStar, setShowStar] = useAtom(showStarAtom);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuHandlers = useMemo(
    () => ({
      toggleTriangle: () => setShowTriangle((prev) => !prev),
      toggleCount: () => setShowCount((prev) => !prev),
      toggleSnow: () => setShowSnow((prev) => !prev),
      toggleStar: () => setShowStar((prev) => !prev),
      toggleDialog: () => setIsOpen((prev) => !prev),
    }),
    [],
  );

  const addTestOrnament = useCallback(() => {
    const randomType = Math.floor(Math.random() * ORNAMENT_TYPE_COUNT) + 1;
    const ornament = createOrnament('테스트_Client', randomType);
    const initialPosition = getInitialPosition();
    setAnimationQueue((prev) => [...prev, { ...ornament, id: uuidv4(), initialPosition }]);
  }, []);

  const addTest50 = useCallback(() => {
    for (let i = 0; i < 50; i++) {
      addTestOrnament();
    }
  }, [addTestOrnament]);

  const removeTree = useCallback(async () => {
    if (!treeId) return;
    try {
      await deleteTree(treeId);
      toaster.success({
        title: '트리를 성공적으로 삭제했습니다',
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '트리 삭제 실패',
        description: '잠시 후 다시 시도해주세요',
      });
    }
  }, [treeId, navigate]);

  return {
    showTriangle,
    showCount,
    showSnow,
    showStar,
    isOpen,
    setIsOpen,
    menuHandlers,
    addTestOrnament,
    addTest50,
    removeTree,
  };
}
