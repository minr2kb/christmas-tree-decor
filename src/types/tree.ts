export type TreeType = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  userId: string;
};

export type TreeState = {
  id: string;
  treeId: string;
  showCount: boolean;
  showSnow: boolean;
  showStar: boolean;
  showTitle: boolean;
  updatedAt: Date;
};
