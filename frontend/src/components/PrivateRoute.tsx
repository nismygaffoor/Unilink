// src/components/PrivateRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../services/auth"; // your Firebase Auth wrapper

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange((firebaseUser) => {
      if (firebaseUser?.email) {
        setUser(firebaseUser.email);
        localStorage.setItem("userEmail", firebaseUser.email);
      } else {
        setUser(null);
        localStorage.removeItem("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
