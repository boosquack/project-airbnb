import { Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const showNavbar = token && !isLandingPage;

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;
