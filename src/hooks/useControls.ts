import { useSetAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ORNAMENT_TYPE_COUNT } from '@/constants/consts';
import {
  animationQueueAtom,
  showCountAtom,
  showSnowAtom,
  showStarAtom,
  showTitleAtom,
  showTriangleAtom,
} from '@/store/atoms';
import { createOrnament } from '@/utils/ornament';
import { deleteTree } from '@/api/tree';
import { toaster } from '@/components/ui/toaster';

export function useControls(treeId?: string) {
  const setAnimationQueue = useSetAtom(animationQueueAtom);
  const setShowTriangle = useSetAtom(showTriangleAtom);
  const setShowCount = useSetAtom(showCountAtom);
  const setShowSnow = useSetAtom(showSnowAtom);
  const setShowStar = useSetAtom(showStarAtom);
  const setShowTitle = useSetAtom(showTitleAtom);
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const menuHandlers = useMemo(
    () => ({
      toggleTriangle: () => setShowTriangle((prev) => !prev),
      toggleCount: () => setShowCount((prev) => !prev),
      toggleSnow: () => setShowSnow((prev) => !prev),
      toggleStar: () => setShowStar((prev) => !prev),
      toggleDeleteConfirmDialog: () => setIsDeleteConfirmOpen((prev) => !prev),
      toggleTitle: () => setShowTitle((prev) => !prev),
    }),
    [],
  );

  const addTestOrnament = useCallback(() => {
    const randomType = Math.floor(Math.random() * ORNAMENT_TYPE_COUNT) + 1;
    const ornament = createOrnament('테스트_Client', randomType);
    setAnimationQueue((prev) => [...prev, { id: uuidv4(), ...ornament }]);
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
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
    menuHandlers,
    addTestOrnament,
    addTest50,
    removeTree,
  };
}
