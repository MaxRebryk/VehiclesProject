import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth.hook";
import { useAuthStore } from "../../store/auth-store";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { refresh } = useAuth();
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      setLoading(false);
      return;
    }

    const init = async () => {
      if (!accessToken) {
        await refresh();
      }
      hasInitialized.current = true;
      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (hasInitialized.current && accessToken) {
      setLoading(false);
    }
  }, [accessToken]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <>{children}</>;
}
