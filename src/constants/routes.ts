export const ROUTES = {
  home: '/',
  create: '/create',
  scan: '/scan',
  myTrees: '/my-trees',
  tree: (treeId: string = ':treeId') => `/tree/${treeId}`,
  send: (treeId: string = ':treeId') => `/send/${treeId}`,
  remote: (treeId: string = ':treeId') => `/remote/${treeId}`,
  authCallback: '/auth/callback',
  other: '*',
} as const;

export const pageTitleMap: Record<string, string> = {
  '/': 'home',
  '/create': 'create',
  '/scan': 'scan',
  '/my-trees': 'my-trees',
  '/tree': 'tree',
  '/send': 'send',
  '/remote': 'remote',
};
