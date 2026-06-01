import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type AdminUserRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  createdAt: Date;
};

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users: AdminUserRow[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6 px-4 md:px-0">
      <AdminPageHeader
        title="User Management"
        subtitle="Manage admin and staff accounts, privileges, and access."
      />

      {/* ==================== DESKTOP TABLE VIEW ==================== */}
      <div className="hidden md:block bg-zinc-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-6">Name</th>
              <th className="text-left p-6">Email</th>
              <th className="text-left p-6">Phone</th>
              <th className="text-left p-6">Role</th>
              <th className="text-left p-6">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800 hover:bg-zinc-800/50">
                <td className="p-6 font-medium">{user.name}</td>
                <td className="p-6">{user.email}</td>
                <td className="p-6">{user.phone}</td>
                <td className="p-6">
                  <span className={`px-4 py-1 rounded-full text-xs font-medium
                    ${user.role === "ADMIN" ? "bg-yellow-400/10 text-yellow-400" : "bg-blue-400/10 text-blue-400"}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-6 text-sm text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==================== MOBILE CARD VIEW ==================== */}
      <div className="block md:hidden space-y-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="bg-zinc-900 p-6 rounded-3xl border border-white/5 space-y-4"
          >
            {/* Header Row: Name & Role Badge */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${user.role === "ADMIN" ? "bg-yellow-400/10 text-yellow-400" : "bg-blue-400/10 text-blue-400"}`}>
                {user.role}
              </span>
            </div>

            <hr className="border-zinc-800" />

            {/* Meta Details List */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="text-gray-300 break-all pl-4 text-right">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-300">{user.phone || "—"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}