import AdminDashboardContent from "../../../components/dashboard/admin/AdminDashboardContent";
import UserDashboardContent from "../../../components/dashboard/user/UserDashboardContent";

import { getUserSession } from "../../../lib/core/session";

const DashboardHome = () => {
  const session = getUserSession();

  interface ExtendedUser {
    role?: string;
  }

  const user = session?.user as ExtendedUser | undefined;
  const role = user?.role || "user";

  return role === "admin" ? (
    <AdminDashboardContent />
  ) : (
    <UserDashboardContent />
  );
};

export default DashboardHome;
