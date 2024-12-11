import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getPageTitle } from '@/utils/route';
import { Helmet } from 'react-helmet-async';

const Layout = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <>
      <Helmet>
        <title>{pageTitle ? `트리꾸미기🎄| ${pageTitle}` : '트리꾸미기🎄'}</title>
      </Helmet>

      <Outlet />
    </>
  );
};

export default Layout;
