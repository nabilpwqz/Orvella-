import { MailIcon, CalendarIcon, ShieldIcon, UserIcon } from "../../../common/Icons";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

interface ManageUsersTableProps {
  users: UserItem[];
}

const ManageUsersTable = ({ users }: ManageUsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center p-12 rounded-3xl border border-dashed border-perf-border bg-perf-card text-perf-text-muted text-xs">
        No registered patrons located in the active Maison register.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-perf-border bg-perf-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-perf-input-bg border-b border-perf-border text-perf-text-muted uppercase text-[10px] font-bold tracking-[0.2em]">
              <th className="py-4 px-6">Maison Patron</th>
              <th className="py-4 px-6">Digital Dossier</th>
              <th className="py-4 px-6">Enrolled Date</th>
              <th className="py-4 px-6 text-right">Authentication Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-perf-border/40 text-perf-text-main">
            {users.map((user) => (
              <tr
                key={user._id}
                className="group hover:bg-perf-input-bg/60 transition-colors duration-200"
              >
                {/* Member Profile */}
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-perf-input-bg border border-perf-border text-perf-gold shadow-xs">
                      <UserIcon size={15} />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-perf-text-main group-hover:text-perf-gold transition-colors font-serif-luxury text-base">
                        {user.name}
                      </span>
                      <span className="block text-[10px] text-perf-text-muted font-mono">
                        REF: {user._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-6 whitespace-nowrap text-xs text-perf-text-muted font-mono">
                  <span className="flex items-center gap-2">
                    <MailIcon size={13} className="text-perf-gold" />
                    {user.email}
                  </span>
                </td>

                {/* Created Date */}
                <td className="py-4 px-6 whitespace-nowrap text-xs text-perf-text-muted font-mono">
                  <span className="flex items-center gap-2">
                    <CalendarIcon size={13} className="text-perf-text-muted" />
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </td>

                {/* Verification Status */}
                <td className="py-4 px-6 whitespace-nowrap text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      user.emailVerified
                        ? "bg-perf-gold/15 text-perf-gold border border-perf-gold/30"
                        : "bg-perf-input-bg text-perf-text-muted border border-perf-border"
                    }`}
                  >
                    <ShieldIcon size={12} />
                    {user.emailVerified ? "Verified Patron" : "Standard Entry"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersTable;
