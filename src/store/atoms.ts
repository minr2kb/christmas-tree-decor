import { atom } from 'jotai';
import { OrnamentType, OrnamentWithInitialPositionType } from '@/types/ornament';
import { TreeState, TreeType } from '@/types/tree';
import { ConfirmDialogType, LoginModalType } from '@/types/dialog';

/**
 * 실제 화면에 렌더되는 ornament 목록
 */
export const ornamentsAtom = atom<OrnamentWithInitialPositionType[]>([]);
export const ornamentsCountAtom = atom((get) => get(ornamentsAtom).length);
/**
 * 애니메이션 큐 - 애니메이션 큐에 들어온 순서대로 ornaments에 interval을 두고 push
 */
export const animationQueueAtom = atom<OrnamentType[]>([]);

/**
 * 트리 정보
 */
export const treeAtom = atom<TreeType | null>(null);

/**
 * 트리 상태
 */
export const treeStateAtom = atom<TreeState | null>(null);
export const showTriangleAtom = atom(false);

/**
 * 컨펌 다이얼로그 활성화용
 */
export const confirmDialogAtom = atom<ConfirmDialogType | null>(null);

/**
 * 로그인 다이얼로그 활성화용
 */
export const loginModalAtom = atom<LoginModalType | null>(null);
