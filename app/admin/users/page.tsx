import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
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
    <div className="space-y-6 mt-10">
      <h1 className="text-4xl font-bold">User Management</h1>
      <p className="text-gray-400">Manage Admin & Staff Accounts</p>

      <div className="bg-zinc-900 rounded-3xl overflow-hidden">
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
    </div>
  );
}