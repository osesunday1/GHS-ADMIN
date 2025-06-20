import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProduct, getProducts } from '../../../store/actions/inventoryActions';
import GeneralModal from '../../../components/common/GeneralModal';

const EditInventory = ({ isOpen, onClose, product, updateProduct, getProducts }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        category: product.category || '',
        supplier: product.supplier || '',
        quantity: product.quantity || 0,
        reorderLevel: product.reorderLevel || 0,
        marketprice: product.marketprice || 0,
        sellingprice: product.sellingprice || 0,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product._id, formData);
      onClose();
      getProducts();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />
        <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" className="p-2 border rounded" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" />
        <input name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier" className="p-2 border rounded" />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="p-2 border rounded" />
        <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleChange} placeholder="Reorder Level" className="p-2 border rounded" />
        <input type="number" name="marketprice" value={formData.marketprice} onChange={handleChange} placeholder="Market Price" className="p-2 border rounded" />
        <input type="number" name="sellingprice" value={formData.sellingprice} onChange={handleChange} placeholder="Selling Price" className="p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-2">Update Product</button>
      </form>
    </GeneralModal>
  );
};

export default connect(null, { updateProduct, getProducts })(EditInventory);