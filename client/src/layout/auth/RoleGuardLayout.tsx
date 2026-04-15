import { useAuthStore } from "@/features/auth/store";
import type { UserRole } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

type RoleGuardLayoutProps = {
  allow: UserRole[];
};

export function RoleGuardLayout({ allow }: RoleGuardLayoutProps) {
  const { isBootstrapped, user, status } = useAuthStore();

  if (!isBootstrapped || status === "loading") return null;

  if (!user) {
    return <Navigate to={"/sign-in"} replace />;
  }

  if (!allow.includes(user.role)) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
