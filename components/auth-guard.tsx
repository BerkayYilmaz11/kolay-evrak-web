"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/utils/auth";

const publicPaths = ["/login", "/invite"];

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isPublicPath = publicPaths.includes(pathname);
      const isAuthenticated = auth.isAuthenticated();

      if (!isAuthenticated && !isPublicPath) {
        router.push("/login");
      } else if (isAuthenticated && isPublicPath) {
        router.push("/dashboard");
      } else {
        setIsAuthorized(true);
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show nothing while checking authentication
  if (isChecking) {
    return null;
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
}
