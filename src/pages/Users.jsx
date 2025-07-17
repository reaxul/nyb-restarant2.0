import { Trash } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../redux/api/userApi/userApi";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const Users = () => {
  const user = useAppSelector(useCurrentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { data, isLoading, isError } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  if (!user) return null;
  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (isError) return <div className="text-center py-6 text-error">Error loading users.</div>;

  const filteredUsers = data?.users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || u.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || u.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 px-4 md:px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary font-open-sans">Users</h2>
      </div>

      <div className="bg-surface rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-hover">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td className="px-6 py-4 text-sm text-primary">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-primary">{u.email}</td>
                  <td className="px-6 py-4 text-sm text-primary">{u.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        u.status === "active"
                          ? "bg-green-500/70 text-white"
                          : "bg-red-500/70 text-white"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary">
                    <button
                      className="text-error hover:text-red-600/80 transition-all flex items-center ml-4"
                      disabled={isDeleting}
                      onClick={() => {
                        setUserToDelete(u);
                        setModalOpen(true);
                      }}
                    >
                      <Trash className="w-5 h-5" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-secondary">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-primary">Confirm Delete</h3>
            <p className="mb-6 text-sm text-primary">
              Are you sure you want to delete{" "}
              <span className="font-bold">{userToDelete?.name}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteUser(userToDelete._id);
                  setModalOpen(false);
                  setUserToDelete(null);
                }}
                disabled={isDeleting || user._id === userToDelete._id}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
