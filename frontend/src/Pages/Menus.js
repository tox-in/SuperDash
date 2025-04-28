import { useState, useEffect } from 'react';
import apiService from '../Services/apiService';
import MenuForm from '../Components/MenuForm';
import ErrorAlert from '../Components/ErrorAlert';

function Menus() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMenu, setEditMenu] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await apiService.getMenus();
      setMenus(response);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load menus');
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await apiService.createMenu(data);
      setShowForm(false);
      fetchMenus();
    } catch (err) {
      throw new Error(err.message || 'Failed to create menu');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await apiService.updateMenu(editMenu.id, data);
      setShowForm(false);
      setEditMenu(null);
      fetchMenus();
    } catch (err) {
      throw new Error(err.message || 'Failed to update menu');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteMenu(id);
      fetchMenus();
    } catch (err) {
      setError(err.message || 'Failed to delete menu');
    }
  };

  if (loading) return <div className="ml-64 p-8">Loading...</div>;

  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-4">Menu Management</h2>
      {error && <ErrorAlert message={error} />}
      <button
        onClick={() => {
          setShowForm(true);
          setEditMenu(null);
        }}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4 hover:bg-indigo-700"
      >
        Add New Menu
      </button>
      {showForm && (
        <MenuForm
          onSubmit={editMenu ? handleUpdate : handleCreate}
          initialData={editMenu || {}}
          onCancel={() => setShowForm(false)}
        />
      )}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-t">
                <td className="p-4">{menu.name}</td>
                <td className="p-4">${menu.price.toFixed(2)}</td>
                <td className="p-4">{menu.category}</td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setEditMenu(menu);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
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
    </div>
  );
}

export default Menus;