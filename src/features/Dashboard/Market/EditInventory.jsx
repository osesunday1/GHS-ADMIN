import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProduct, getProducts } from '../../../store/actions/inventoryActions';
import GeneralModal from '../../../components/common/GeneralModal';

const CATEGORIES = [
  { value: 'alcoholic drinks', label: 'Alcoholic Drinks' },
  { value: 'non-alcoholic drinks', label: 'Non-Alcoholic Drinks' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'food items', label: 'Food Items' },
  { value: 'toiletries', label: 'Toiletries' },
];

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);

const EditInventory = ({ isOpen, onClose, product, updateProduct, getProducts }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        category: product.category || '',
        supplier: product.supplier || '',
        quantity: product.quantity ?? 0,
        reorderLevel: product.reorderLevel ?? 0,
        marketPrice: product.marketPrice ?? 0,
        sellingPrice: product.sellingPrice ?? 0,
      });
      setError('');
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateProduct(product._id, formData);
      getProducts();
      onClose();
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const margin =
    formData.sellingPrice && formData.marketPrice && Number(formData.sellingPrice) > 0
      ? (((Number(formData.sellingPrice) - Number(formData.marketPrice)) / Number(formData.sellingPrice)) * 100).toFixed(1)
      : null;

  if (!isOpen || !product) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose} size="max-w-xl">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Edit Product</h2>
        <p className="text-xs text-gray-500 mt-0.5">Update details for <span className="font-medium">{product.name}</span></p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Product Name">
            <input name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label="SKU">
            <input name="sku" value={formData.sku} onChange={handleChange} className={inputClass} />
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
            <input name="supplier" value={formData.supplier} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Quantity">
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" className={inputClass} />
          </Field>
          <Field label="Reorder Level">
            <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} min="0" className={inputClass} />
          </Field>
          <Field label="Cost Price (₦)">
            <input type="number" name="marketPrice" value={formData.marketPrice} onChange={handleChange} min="0" className={inputClass} />
          </Field>
          <Field label="Selling Price (₦)">
            <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} min="0" className={inputClass} />
          </Field>
        </div>

        {margin !== null && (
          <div className={`rounded-lg px-3 py-2 text-xs flex justify-between ${Number(margin) > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            <span>Profit per unit</span>
            <span className="font-bold">
              ₦{(Number(formData.sellingPrice) - Number(formData.marketPrice)).toLocaleString()} &nbsp;·&nbsp; {margin}%
            </span>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-secondary hover:opacity-90 text-white text-sm font-medium disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </GeneralModal>
  );
};

export default connect(null, { updateProduct, getProducts })(EditInventory);
