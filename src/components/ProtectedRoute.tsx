import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;