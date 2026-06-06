import { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { removeMultipleStock } from '../../../store/actions/stockActions';
import { getProducts } from '../../../store/actions/inventoryActions';
import { getGuests } from '../../../store/actions/guestActions';
import { FaPlus, FaTrash, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';

const emptyEntry = () => ({ productId: '', quantity: '', note: '' });

const SellProduct = ({ products, guests, removeMultipleStock, getProducts, getGuests }) => {
  const [customerName, setCustomerName] = useState('');
  const [entries, setEntries] = useState([emptyEntry()]);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { getProducts(); getGuests(); }, [getProducts, getGuests]);

  const handleEntryChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...entries];
    updated[index] = { ...updated[index], [name]: value };
    setEntries(updated);
    setStatus(null);
  };

  const addEntry = () => setEntries(prev => [...prev, emptyEntry()]);

  const removeEntry = (index) => setEntries(prev => prev.filter((_, i) => i !== index));

  const getProduct = (id) => products.find(p => p._id === id);

  const cartItems = useMemo(() => {
    return entries
      .filter(e => e.productId && e.quantity)
      .map(e => {
        const product = getProduct(e.productId);
        const qty = Number(e.quantity) || 0;
        const unitPrice = product?.sellingPrice || 0;
        return {
          name: product?.name || '—',
          qty,
          unitPrice,
          total: qty * unitPrice,
          stock: product?.quantity ?? 0,
          overStock: product ? qty > product.quantity : false,
        };
      });
  }, [entries, products]);

  const grandTotal = cartItems.reduce((s, i) => s + i.total, 0);
  const hasOverStock = cartItems.some(i => i.overStock);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasOverStock) {
      setErrorMsg('One or more items exceed available stock.');
      setStatus('error');
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await removeMultipleStock({ customerName, products: entries });
      setCustomerName('');
      setEntries([emptyEntry()]);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Transaction failed');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sell Products</h1>
        <p className="text-sm text-gray-500 mt-0.5">Record a sale transaction for a guest</p>
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
          <FaCheckCircle className="flex-shrink-0" />
          <span>Transaction recorded successfully!</span>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <div className="flex gap-5 items-start">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">

          {/* Guest Selection */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Guest / Customer</label>
            <select
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              required
            >
              <option value="">— Select a guest —</option>
              {guests.map(g => (
                <option key={g._id} value={`${g.firstName} ${g.lastName}`}>
                  {g.firstName} {g.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Product Entries */}
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-gray-700">Products</h2>
              <button
                type="button"
                onClick={addEntry}
                className="flex items-center gap-1.5 text-xs text-secondary hover:opacity-80 font-medium transition cursor-pointer"
              >
                <FaPlus className="text-[10px]" /> Add Item
              </button>
            </div>

            {entries.map((entry, index) => {
              const product = getProduct(entry.productId);
              const over = product && entry.quantity && Number(entry.quantity) > product.quantity;
              return (
                <div key={index} className={`border rounded-xl p-4 space-y-3 transition ${over ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Item {index + 1}</span>
                    {entries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntry(index)}
                        className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Product</label>
                      <select
                        name="productId"
                        value={entry.productId}
                        onChange={e => handleEntryChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                        required
                      >
                        <option value="">Select product</option>
                        {products.map(p => (
                          <option key={p._id} value={p._id} disabled={p.quantity === 0}>
                            {p.name} {p.quantity === 0 ? '(Out of stock)' : `(${p.quantity} left)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">
                        Quantity
                        {product && (
                          <span className={`ml-1 ${over ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                            (max {product.quantity})
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={entry.quantity}
                        onChange={e => handleEntryChange(index, e)}
                        min="1"
                        max={product?.quantity}
                        placeholder="0"
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${over ? 'border-red-400' : 'border-gray-200'}`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Note (optional)</label>
                    <input
                      type="text"
                      name="note"
                      value={entry.note}
                      onChange={e => handleEntryChange(index, e)}
                      placeholder="e.g. Room 4 order"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  {product && entry.quantity && (
                    <div className={`text-xs font-medium rounded-lg px-3 py-2 flex justify-between ${over ? 'bg-red-100 text-red-600' : 'bg-green-50 text-green-700'}`}>
                      <span>{over ? 'Exceeds available stock!' : `₦${product.sellingPrice?.toLocaleString()} × ${entry.quantity}`}</span>
                      {!over && <span className="font-bold">₦{(product.sellingPrice * Number(entry.quantity)).toLocaleString()}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || cartItems.length === 0 || hasOverStock}
              className="px-8 py-3 rounded-xl bg-secondary hover:opacity-90 text-white font-semibold text-sm transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Processing...' : 'Complete Sale'}
            </button>
          </div>
        </form>

        {/* Right: Order Summary */}
        <div className="w-72 flex-shrink-0 sticky top-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-secondary px-5 py-4">
              <div className="flex items-center gap-2 text-white">
                <FaShoppingCart />
                <h2 className="font-semibold text-sm">Order Summary</h2>
              </div>
              {customerName && (
                <p className="text-xs text-white opacity-80 mt-1">For: {customerName}</p>
              )}
            </div>

            <div className="p-4 space-y-2 min-h-[120px]">
              {cartItems.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No items added yet</p>
              ) : (
                cartItems.map((item, i) => (
                  <div key={i} className={`flex justify-between items-start text-sm pb-2 border-b border-gray-100 last:border-0 ${item.overStock ? 'text-red-500' : ''}`}>
                    <div>
                      <p className="font-medium text-gray-800 text-xs leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.qty} × ₦{item.unitPrice.toLocaleString()}
                      </p>
                    </div>
                    <span className="font-semibold text-xs">₦{item.total.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <span className="text-lg font-bold text-secondary">₦{grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.inventory.products,
  guests: state.guests.guests,
});

export default connect(mapStateToProps, { removeMultipleStock, getProducts, getGuests })(SellProduct);
