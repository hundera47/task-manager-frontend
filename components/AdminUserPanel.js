import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';

export default function AdminUserPanel() {
  const { users, fetchUsers, addUser, updateUser, deleteUser, loading } = useUserStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateUser(editId, form);
      setEditId(null);
    } else {
      await addUser(form);
    }
    setForm({ name: '', email: '', password: '', role: 'user' });
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role, password: '' });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-10">
      <h3 className="text-xl font-semibold mb-4">👑 Admin — Manage Users</h3>

      {/* Add / Edit User Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-3 mb-6 border-b pb-4"
      >
        <input
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded flex-1"
          required
        />
        {!editId && (
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
        )}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* User Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3 text-gray-500">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : '--'}
                  </td>
                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(u)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
