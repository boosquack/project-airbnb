import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;
