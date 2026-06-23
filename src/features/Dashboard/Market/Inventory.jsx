import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../store/actions/inventoryActions';
import EditInventory from './EditInventory';
import GeneralModal from '../../../components/common/GeneralModal';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaBoxOpen } from 'react-icons/fa';

const CATEGORIES = ['all', 'alcoholic drinks', 'non-alcoholic drinks', 'beverages', 'food items', 'toiletries', 'snacks'];

const StatusBadge = ({ quantity, reorderLevel }) => {
  if (quantity === 0)
    return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-medium">Out of Stock</span>;
  if (quantity <= reorderLevel)
    return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">Low Stock</span>;
  return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 font-medium">In Stock</span>;
};

const Inventory = ({ products, loading, error, getProducts, deleteProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => { getProducts(); }, [getProducts]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q);
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const stats = useMemo(() => ({
    total: products.length,
    inStock: products.filter(p => p.quantity > p.reorderLevel).length,
    lowStock: products.filter(p => p.quantity > 0 && p.quantity <= p.reorderLevel).length,
    outOfStock: products.filter(p => p.quantity === 0).length,
  }), [products]);

  const handleEdit = (product) => { setSelectedProduct(product); setShowEditModal(true); };
  const handleDelete = (product) => { setSelectedProduct(product); setShowDeleteModal(true); };
  const confirmDelete = async () => {
    await deleteProduct(selectedProduct._id);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} products total</p>
        </div>
        <Link
          to="/admin/inventory/add"
          className="flex items-center gap-2 bg-secondary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <FaPlus className="text-xs" /> Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: stats.total, color: 'border-blue-500', textColor: 'text-blue-600' },
          { label: 'In Stock', value: stats.inStock, color: 'border-green-500', textColor: 'text-green-600' },
          { label: 'Low Stock', value: stats.lowStock, color: 'border-yellow-500', textColor: 'text-yellow-600' },
          { label: 'Out of Stock', value: stats.outOfStock, color: 'border-red-500', textColor: 'text-red-600' },
        ].map(({ label, value, color, textColor }) => (
          <div key={label} className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${color}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full mb-3"></div>
            <p className="text-sm">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FaBoxOpen className="text-5xl mx-auto mb-3 opacity-30" />
            <p className="font-medium">No products found</p>
            <p className="text-sm mt-1 text-gray-400">Try adjusting your search or filter</p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500 font-semibold">
                <th className="py-3 px-5 text-left">Product</th>
                <th className="py-3 px-4 text-left">SKU</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-right">Qty</th>
                <th className="py-3 px-4 text-right">Cost Price</th>
                <th className="py-3 px-4 text-right">Selling Price</th>
                <th className="py-3 px-4 text-right">Margin</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map(p => {
                const margin =
                  p.sellingPrice && p.marketPrice && p.sellingPrice > 0
                    ? Math.round(((p.sellingPrice - p.marketPrice) / p.sellingPrice) * 100)
                    : 0;
                return (
                  <tr
                    key={p._id}
                    className={`hover:bg-gray-50 transition ${p.quantity === 0 ? 'opacity-60' : ''}`}
                  >
                    <td className="py-3.5 px-5">
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      {p.supplier && <p className="text-xs text-gray-400 mt-0.5">{p.supplier}</p>}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">{p.sku || '—'}</td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded-md">
                        {p.category || '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge quantity={p.quantity} reorderLevel={p.reorderLevel} />
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-800">{p.quantity}</td>
                    <td className="py-3.5 px-4 text-right text-gray-500">₦{p.marketPrice?.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-gray-800">
                      ₦{p.sellingPrice?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`text-xs font-bold ${margin >= 20 ? 'text-green-600' : margin > 0 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {margin}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <p>Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`px-3 py-1 rounded-lg border transition ${
                    currentPage === pg
                      ? 'bg-secondary text-white border-secondary'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      <EditInventory
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={selectedProduct}
      />

      <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <FaTrash className="text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Delete Product</h2>
              <p className="text-xs text-gray-500">This cannot be undone</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </GeneralModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.inventory.products,
  loading: state.inventory.loading,
  error: state.inventory.error,
});

export default connect(mapStateToProps, { getProducts, deleteProduct })(Inventory);
