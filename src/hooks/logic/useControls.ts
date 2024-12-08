import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ORNAMENT_TYPE_COUNT } from '@/constants/ui';
import {
  animationQueueAtom,
  showCountAtom,
  showSnowAtom,
  showStarAtom,
  showTitleAtom,
  showTriangleAtom,
  treeAtom,
} from '@/store/atoms';
import { createOrnament } from '@/utils/ornament';
import TreeAPI from '@/api/tree';
import { toaster } from '@/components/ui/toaster';
import useConfirmDialog from '../useConfirmDialog';
import useSession from '../useSession';
import useLoginModal from '../useLoginModal';
import { ROUTES } from '@/constants/routes';

const useControls = (treeId?: string) => {
  const setAnimationQueue = useSetAtom(animationQueueAtom);
  const setShowTriangle = useSetAtom(showTriangleAtom);
  const setShowCount = useSetAtom(showCountAtom);
  const setShowSnow = useSetAtom(showSnowAtom);
  const setShowStar = useSetAtom(showStarAtom);
  const setShowTitle = useSetAtom(showTitleAtom);
  const navigate = useNavigate();

  const { handleOpenLoginDialog } = useLoginModal();
  const { confirm } = useConfirmDialog();
  const { isAuthenticated, user } = useSession();
  const tree = useAtomValue(treeAtom);
  const isOwner = tree?.userId === user?.id;

  const menuHandlers = useMemo(
    () => ({
      toggleTriangle: () => setShowTriangle((prev) => !prev),
      toggleCount: () => setShowCount((prev) => !prev),
      toggleSnow: () => setShowSnow((prev) => !prev),
      toggleStar: () => setShowStar((prev) => !prev),
      removeTree: () => onClickRemoveTree(),
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
    if (!isAuthenticated) return;
    if (!treeId) return;
    try {
      await TreeAPI.deleteTree(treeId);
      toaster.success({
        title: '트리를 성공적으로 삭제했습니다',
      });
      navigate(ROUTES.home);
    } catch (error) {
      console.error(error);
      toaster.error({
        title: '트리 삭제 실패',
        description: '잠시 후 다시 시도해주세요',
      });
    }
  }, [isAuthenticated, treeId, navigate]);

  const onClickRemoveTree = useCallback(() => {
    if (!isAuthenticated) return;
    confirm({
      title: '트리를 삭제하시겠어요?',
      body: '모든 장식도 함께 사라집니다',
      onConfirm: removeTree,
      confirmText: '삭제',
      isDestructive: true,
    });
  }, [isAuthenticated, confirm, removeTree]);

  return {
    menuHandlers,
    addTestOrnament,
    addTest50,
    onClickRemoveTree,
    isOwner,
    handleOpenLoginDialog,
  };
};

export default useControls;
