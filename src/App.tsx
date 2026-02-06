import { Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  // Show navbar on all pages except landing and auth pages
  const showNavbar = !isLandingPage && !isAuthPage;

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;
