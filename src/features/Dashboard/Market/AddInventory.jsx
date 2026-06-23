import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, getProducts } from '../../../store/actions/inventoryActions';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const CATEGORIES = [
  { value: 'alcoholic drinks', label: 'Alcoholic Drinks' },
  { value: 'non-alcoholic drinks', label: 'Non-Alcoholic Drinks' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'food items', label: 'Food Items' },
  { value: 'toiletries', label: 'Toiletries' },
  { value: 'snacks', label: 'Snacks' },
];

const emptyForm = {
  name: '',
  sku: '',
  category: '',
  supplier: '',
  quantity: '',
  reorderLevel: '',
  marketPrice: '',
  sellingPrice: '',
};

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition";

const AddInventory = ({ addProduct, getProducts }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const margin =
    formData.sellingPrice && formData.marketPrice && Number(formData.sellingPrice) > 0
      ? (((Number(formData.sellingPrice) - Number(formData.marketPrice)) / Number(formData.sellingPrice)) * 100).toFixed(1)
      : null;

  const profit =
    formData.sellingPrice && formData.marketPrice
      ? Number(formData.sellingPrice) - Number(formData.marketPrice)
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await addProduct(formData);
      getProducts();
      setFormData(emptyForm);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to add product');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/inventory" className="text-gray-400 hover:text-gray-600 transition">
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
          <p className="text-sm text-gray-500">Add a new item to your inventory</p>
        </div>
      </div>

      {/* Success Banner */}
      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
          <FaCheckCircle className="text-green-500 flex-shrink-0" />
          <span>Product added successfully!</span>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Details Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide border-b pb-2">Product Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Product Name" required>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Coca-Cola 50cl"
                className={inputClass}
                required
              />
            </Field>
            <Field label="SKU" required>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. BEV-001"
                className={inputClass}
                required
              />
            </Field>
            <Field label="Category">
              <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Supplier">
              <input
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="e.g. ABC Distributors"
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        {/* Stock & Pricing Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide border-b pb-2">Stock & Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Opening Quantity">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={inputClass}
              />
            </Field>
            <Field label="Reorder Level">
              <input
                type="number"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleChange}
                placeholder="5"
                min="0"
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">Alert when stock falls below this</p>
            </Field>
            <Field label="Cost Price (₦)" required>
              <input
                type="number"
                name="marketPrice"
                value={formData.marketPrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                className={inputClass}
                required
              />
            </Field>
            <Field label="Selling Price (₦)" required>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                className={inputClass}
                required
              />
            </Field>
          </div>

          {/* Margin Preview */}
          {margin !== null && (
            <div className={`rounded-lg p-3 text-sm flex items-center justify-between ${
              Number(margin) > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}>
              <span>Profit margin preview</span>
              <span className="font-bold">
                ₦{profit?.toLocaleString()} &nbsp;·&nbsp; {margin}%
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link
            to="/admin/inventory"
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-secondary hover:opacity-90 text-white text-sm font-medium transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addProduct, getProducts })(AddInventory);
