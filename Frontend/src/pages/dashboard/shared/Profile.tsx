import AdminProfileContent from "../../../components/dashboard/admin/AdminProfileContent";
import UserProfileContent from "../../../components/dashboard/user/UserProfileContent";
import { getUserSession } from "../../../lib/core/session";

const Profile = () => {
  const session = getUserSession();

  interface ExtendedUser {
    role?: string;
  }

  const user = session?.user as ExtendedUser | undefined;
  const role = user?.role || "user";

  if (role === "admin") {
    return <AdminProfileContent />;
  }

  return <UserProfileContent />;
};

export default Profile;
