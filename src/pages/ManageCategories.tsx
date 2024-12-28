import React, { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios.config';
import { Plus, Pencil, Trash2, X, Check, Landmark, Brain, FileText, Shield, Coins, 
  Wallet, CreditCard, PieChart, LineChart, BarChart, DollarSign, Bitcoin, Building, Network } from 'lucide-react';

interface Category {
  _id: string;
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string | null;
}

const DEFAULT_CATEGORY_IDS = ['fintech', 'ai-ml', 'research'];

const AVAILABLE_ICONS = [
  { id: 'Landmark', component: Landmark, label: 'Landmark' },
  { id: 'Brain', component: Brain, label: 'Brain' },
  { id: 'FileText', component: FileText, label: 'Document' },
  { id: 'Shield', component: Shield, label: 'Security' },
  { id: 'Coins', component: Coins, label: 'Coins' },
  { id: 'ChartBar', component: BarChart, label: 'Chart Bar' },
  { id: 'Wallet', component: Wallet, label: 'Wallet' },
  { id: 'CreditCard', component: CreditCard, label: 'Credit Card' },
  { id: 'PieChart', component: PieChart, label: 'Pie Chart' },
  { id: 'LineChart', component: LineChart, label: 'Line Chart' },
  { id: 'BarChart', component: BarChart, label: 'Bar Chart' },
  { id: 'DollarSign', component: DollarSign, label: 'Dollar' },
  { id: 'Bitcoin', component: Bitcoin, label: 'Bitcoin' },
  { id: 'Building', component: Building, label: 'Building' },
  { id: 'Network', component: Network, label: 'Network' }
];

const IconComponent = ({ iconName }: { iconName: string | null }) => {
  if (!iconName) return null;
  const IconFound = AVAILABLE_ICONS.find(i => i.id === iconName)?.component;
  if (!IconFound) return null;
  return <IconFound className="w-5 h-5" />;
};

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form states
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    displayName: '',
    description: '',
    icon: ''
  });
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    displayName: '',
    description: '',
    icon: ''
  });

  useEffect(() => {
    console.log('ManageCategories component mounted');
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const response = await axiosInstance.get('/categories');
      console.log('Categories fetched:', response.data);
      // Filter out default categories
      const additionalCategories = response.data.filter(
        (cat: Category) => !DEFAULT_CATEGORY_IDS.includes(cat.id)
      );
      setCategories(additionalCategories);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (DEFAULT_CATEGORY_IDS.includes(newCategory.id)) {
      setError('Cannot create a category with a default category ID');
      return;
    }
    try {
      console.log('Creating new category:', newCategory);
      const response = await axiosInstance.post('/categories', newCategory);
      console.log('Category created:', response.data);
      setNewCategory({ id: '', name: '', displayName: '', description: '', icon: '' });
      fetchCategories();
    } catch (err: any) {
      console.error('Error creating category:', err);
      setError(err.response?.data?.message || 'Failed to create category');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    if (DEFAULT_CATEGORY_IDS.includes(editForm.id)) {
      setError('Cannot modify a default category');
      return;
    }

    try {
      const response = await axiosInstance.put(`/categories/${editingId}`, editForm);
      console.log('Category updated:', response.data);
      setEditingId(null);
      fetchCategories();
    } catch (err: any) {
      console.error('Error updating category:', err);
      setError(err.response?.data?.message || 'Failed to update category');
    }
  };

  const handleDelete = async (id: string) => {
    if (DEFAULT_CATEGORY_IDS.includes(id)) {
      setError('Cannot delete a default category');
      return;
    }

    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axiosInstance.delete(`/categories/${id}`);
        fetchCategories();
      } catch (err: any) {
        console.error('Error deleting category:', err);
        setError(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category._id);
    setEditForm({
      id: category.id,
      name: category.name,
      displayName: category.displayName,
      description: category.description,
      icon: category.icon || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      id: '',
      name: '',
      displayName: '',
      description: '',
      icon: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Manage Categories</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
          <button
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setError('')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Create New Category Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID
            </label>
            <input
              type="text"
              value={newCategory.id}
              onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={newCategory.displayName}
              onChange={(e) => setNewCategory({ ...newCategory, displayName: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Icon
            </label>
            <select
              value={newCategory.icon}
              onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an icon</option>
              {AVAILABLE_ICONS.map((icon) => (
                <option key={icon.id} value={icon.id}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Category
            </button>
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Display Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <IconComponent iconName={category.icon} />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingId === category._id ? (
                      <input
                        type="text"
                        value={editForm.id}
                        onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700"
                      />
                    ) : (
                      category.id
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingId === category._id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingId === category._id ? (
                      <input
                        type="text"
                        value={editForm.displayName}
                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700"
                      />
                    ) : (
                      category.displayName
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingId === category._id ? (
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700"
                      />
                    ) : (
                      category.description
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {editingId === category._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleUpdate}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(category)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
