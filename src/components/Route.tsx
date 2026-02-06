import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import { Spinner } from '@/components/ui';

interface RouteProps {
  children: ReactNode;
  isProtected?: boolean;
}

const Route = ({ children, isProtected }: RouteProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (isProtected && token === null) {
      navigate('/signin', { replace: true });
    }
  }, [isProtected, navigate, token]);

  return token === undefined ? (
    <div className="absolute bottom-0 left-0 right-0 top-0 ml-[700px] flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Route;
