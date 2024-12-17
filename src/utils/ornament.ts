import {
  GRID_SIZE,
  MIN_SCALE,
  MAX_SCALE,
  MAX_ROTATION,
  MIN_ROTATION,
  ORNAMENT_ANIMATION_DURATION,
  POP_INTERVAL_TIME,
} from '@/constants/ui';
import { Database } from '@/supabase/database.types';
import { OrnamentType, PositionType } from '@/types/ornament';

export const fixInGrid = (value: number) => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

export const createOrnament = (name: string, type: number): Omit<OrnamentType, 'id'> => {
  // y값은 0.05 ~ 0.95 사이에서 생성
  const rawY = Math.pow(Math.random(), 0.7) * 0.9 + 0.05;
  const y = fixInGrid(rawY);

  const progress = y;
  const maxXOffset = progress / 2;

  const rawX = 0.5 + (Math.random() * maxXOffset * 2 - maxXOffset);
  const x = fixInGrid(rawX);

  const randomRotation = Math.floor(Math.random() * (MAX_ROTATION - MIN_ROTATION) + MIN_ROTATION);
  const randomScale = Math.random() * (MAX_SCALE - MIN_SCALE) + MIN_SCALE;

  const ornament = {
    name,
    type,
    position: { x, y },
    rotation: randomRotation,
    scale: randomScale,
    createdAt: new Date(),
  };

  return ornament;
};

export const getInitialPosition = (index: number): PositionType => {
  // concurrentIndex를 기반으로 좌우 지그재그 패턴 생성
  const concurrentCount = Math.ceil((ORNAMENT_ANIMATION_DURATION * 1000) / POP_INTERVAL_TIME);
  const concurrentIndex = index % concurrentCount;

  // Y 위치 계산
  const verticalSpacing = 0.75 / concurrentCount;
  const initialY = 0.15 + verticalSpacing * concurrentIndex;

  // X 위치 계산
  const isLeft = concurrentIndex % 2 === 0;
  const horizontalOffset = (Math.random() - 0.5) * 0.4;
  const initialX = isLeft
    ? 0.25 + horizontalOffset // 왼쪽
    : 0.75 + horizontalOffset; // 오른쪽

  return { x: initialX, y: initialY };
};

export const parseOrnament = (ornament: Database['public']['Tables']['ornaments']['Row']): OrnamentType => {
  return {
    ...ornament,
    position: ornament.position as PositionType,
    createdAt: new Date(ornament.created_at),
  };
};
