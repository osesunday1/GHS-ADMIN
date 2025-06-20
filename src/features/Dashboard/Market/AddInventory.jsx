import { useState } from 'react';
import { connect } from 'react-redux';
import { addProduct, getProducts } from '../../../store/actions/inventoryActions';

const AddInventory = ({ addProduct, getProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    supplier: '',
    quantity: '',
    reorderLevel: '',
    marketPrice:'',
    sellingPrice:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      setFormData({
        name: '',
        sku: '',
        category: '',
        supplier: '',
        quantity: '',
        reorderLevel: '',
        marketPrice:"",
        sellingPrice:"",
      });
      getProducts(); // refresh inventory list
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    }
  };

  return (
     <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border rounded" required />
      <input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} className="p-2 border rounded" required />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="" disabled>Select a category</option>
        <option value="alcoholic drinks">Alcoholic Drinks</option>
        <option value="non-alcoholic drinks">Non-Alcoholic Drinks</option>
        <option value="beverages">Beverages</option>
        <option value="food items">Food Items</option>
        <option value="toiletries">Toiletries</option>
      </select>
      <input name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="reorderLevel" placeholder="Reorder Level" value={formData.reorderLevel} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="marketPrice" placeholder="Market Price" value={formData.marketPrice} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="sellingPrice" placeholder="Selling Price" value={formData.sellingPrice} onChange={handleChange} className="p-2 border rounded" />
      <button type="submit" className="bg-secondary hover:bg-secondary-200 text-white px-4 py-2 rounded col-span-2 cursor-pointer">Add Product</button>
    </form>
    </div>
  );
};

export default connect(null, { addProduct, getProducts })(AddInventory);