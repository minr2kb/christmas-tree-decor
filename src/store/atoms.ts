import { atom } from 'jotai';
import { OrnamentType, OrnamentWithInitialPositionType } from '@/types/ornament';
import { TreeType } from '@/types/tree';
import { ConfirmDialogType } from '@/types/dialog';

/**
 * 실제 화면에 렌더되는 ornament 목록
 */
export const ornamentsAtom = atom<OrnamentWithInitialPositionType[]>([]);
/**
 * 애니메이션 큐 - 애니메이션 큐에 들어온 순서대로 ornaments에 interval을 두고 push
 */
export const animationQueueAtom = atom<OrnamentType[]>([]);

/**
 * 삼각형(트리 영역) 표시 여부
 */
export const showTriangleAtom = atom(false);
/**
 * 카운트 표시 여부
 */
export const showSnowAtom = atom(true);
/**
 * 별 표시 여부
 */
export const showStarAtom = atom(false);
/**
 * 카운트 표시 여부
 */
export const showCountAtom = atom(false);
/**
 * 중앙 타이틀 표시 여부
 */
export const showTitleAtom = atom(false);

/**
 * 트리 아이디
 */
export const treeAtom = atom<TreeType | null>(null);

/**
 * 컨펌 다이얼로그 활성화용
 */
export const confirmDialogAtom = atom<ConfirmDialogType | null>(null);

/**
 * 로그인 다이얼로그 활성화용
 */
export const openLoginDialogAtom = atom(false);
