import { GRID_SIZE, MIN_SCALE, MAX_SCALE, MAX_ROTATION, MIN_ROTATION } from '@/constants/consts';
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

export const getInitialPosition = (): PositionType => {
  // 삼각형 영역을 피하기 위한 initialX, initialY 계산
  let initialX: number;
  const initialY = 0.6 * Math.random() + 0.2;
  const triangleWidth = initialY; // y 위치에 따른 삼각형의 너비

  // 50% 확률로 왼쪽 또는 오른쪽에 배치
  if (Math.random() < 0.5) {
    // 왼쪽 영역
    initialX = Math.random() * (0.5 - triangleWidth / 2) + 0.1;
  } else {
    // 오른쪽 영역
    initialX = Math.random() * (0.5 - triangleWidth / 2) + (0.9 - (0.5 - triangleWidth / 2));
  }

  return { x: initialX, y: initialY };
};

export const parseOrnament = (ornament: Database['public']['Tables']['ornaments']['Row']): OrnamentType => {
  return {
    ...ornament,
    position: ornament.position as PositionType,
    createdAt: new Date(ornament.created_at),
  };
};
