import { pageTitleMap } from '@/constants/routes';

export function getPageTitle(pathname: string): string {
  // 동적 라우트 처리
  const dynamicRoutes = ['/tree/', '/send/', '/remote/'];
  const matchedRoute = dynamicRoutes.find((route) => pathname.startsWith(route));
  if (matchedRoute) {
    return pageTitleMap[matchedRoute.slice(0, -1)];
  }

  return pageTitleMap[pathname] || '알 수 없는 페이지';
}
