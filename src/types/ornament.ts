export type OrnamentType = {
  id: string;
  name: string;
  type: number;
  rotation: number;
  scale: number;
  position: PositionType;
  createdAt: Date;
};

export type OrnamentWithInitialPositionType = OrnamentType & { initialPosition?: PositionType };

export type PositionType = {
  /**
   * 0~1 사이의 상대적 x 좌표
   */
  x: number;
  /**
   * 0~1 사이의 상대적 y 좌표
   */
  y: number;
};
