import { Navigate } from 'react-router-dom';
import { useAppSelector } from './store';

export function ProtectedRouteIsLoggedIn({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectedRouteIsLoggedOut({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }
  return children;
}
