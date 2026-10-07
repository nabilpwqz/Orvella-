import { useEffect, useState } from "react";
import { getUsers } from "../../../lib/api/user";
import ManageUsersTable from "../../../components/dashboard/admin/manageUsers/ManageUsersTable";
import { LoaderIcon } from "../../../components/common/Icons";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setUsers(Array.isArray(allUsers) ? allUsers : (allUsers as any)?.data || []);
      } catch (error) {
        console.error("Error fetching users inside dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderIcon size={28} className="text-perf-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-perf-text-main animate-fadeIn p-4 sm:p-6 lg:p-8">
      <div className="border-b border-perf-border/60 pb-5">
        <h1 className="text-2xl sm:text-3xl font-light font-serif-luxury tracking-tight">
          Client Registry Management
        </h1>
        <p className="text-xs sm:text-sm text-perf-text-muted mt-1">
          Review, analyze, and manage active patron accounts authenticated with
          Orvella Haute Parfumerie.
        </p>
      </div>

      <ManageUsersTable users={users} />
    </div>
  );
};

export default ManageUsers;
