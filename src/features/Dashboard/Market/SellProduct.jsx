import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { removeMultipleStock  } from '../../../store/actions/stockActions';
import { getProducts } from '../../../store/actions/inventoryActions';
import { getGuests } from '../../../store/actions/guestActions';

const SellProduct = ({ products, removeMultipleStock , getProducts, guests, getGuests }) => {
  const [customerName, setCustomerName] = useState('');
  const [productEntries, setProductEntries] = useState([{ productId: '', quantity: '', note: '' }]);

  useEffect(() => {
    getProducts();
    getGuests();
  }, [getProducts, getGuests]);

  const handleEntryChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...productEntries];
    updated[index][name] = value;
    setProductEntries(updated);
  };

  const addEntry = () => {
    setProductEntries([...productEntries, { productId: '', quantity: '', note: '' }]);
  };

  const removeEntry = (index) => {
    const updated = productEntries.filter((_, i) => i !== index);
    setProductEntries(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const payload = {
            customerName,
            products: productEntries, // <== send array here
            };

            await removeMultipleStock(payload);

            alert('Products sold successfully');
            setCustomerName('');
            setProductEntries([{ productId: '', quantity: '', note: '' }]);
        } catch (err) {
            alert('Failed: ' + err.message);
        }
    };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Sell Multiple Products</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Select Guest */}
        <div>
          <label className="block mb-1 font-medium">Select Guest:</label>
          <select
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Guest --</option>
            {guests.map((guest) => (
              <option key={guest._id} value={`${guest.firstName} ${guest.lastName}`}>
                {guest.firstName} {guest.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Product Entries */}
        {productEntries.map((entry, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-end border p-3 rounded">
            <div>
              <label className="block mb-1 font-medium">Product:</label>
              <select
                name="productId"
                value={entry.productId}
                onChange={(e) => handleEntryChange(index, e)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={entry.quantity}
                onChange={(e) => handleEntryChange(index, e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Note:</label>
              <input
                type="text"
                name="note"
                value={entry.note}
                onChange={(e) => handleEntryChange(index, e)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex items-center">
              {productEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add New Entry */}
        <div>
          <button
            type="button"
            onClick={addEntry}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Another Product
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-200"
          >
            Submit Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.inventory.products,
  guests: state.guests.guests,
});

export default connect(mapStateToProps, { removeMultipleStock , getProducts, getGuests })(SellProduct);