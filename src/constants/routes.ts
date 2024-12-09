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
