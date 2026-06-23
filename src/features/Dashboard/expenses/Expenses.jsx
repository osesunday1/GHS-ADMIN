import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getExpenses, deleteExpense } from '../../../store/actions/expenseActions';
import EditExpense from './EditExpense';
import GeneralModal from '../../../components/common/GeneralModal';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaReceipt, FaWallet, FaCalendarAlt, FaChartBar, FaTag } from 'react-icons/fa';

const CATEGORIES = ['all', 'utilities', 'logistics', 'salary', 'rent', 'maintenance', 'cleaning', 'miscellaneous'];

const categoryColor = {
  utilities:     '#3b82f6',
  logistics:     '#f97316',
  salary:        '#22c55e',
  rent:          '#a855f7',
  maintenance:   '#eab308',
  cleaning:      '#14b8a6',
  miscellaneous: '#9ca3af',
};

const categoryStyle = {
  utilities:     'bg-blue-100 text-blue-700',
  logistics:     'bg-orange-100 text-orange-700',
  salary:        'bg-green-100 text-green-700',
  rent:          'bg-purple-100 text-purple-700',
  maintenance:   'bg-yellow-100 text-yellow-700',
  cleaning:      'bg-teal-100 text-teal-700',
  miscellaneous: 'bg-gray-100 text-gray-500',
};

const paymentStyle = {
  cash:             'bg-green-50 text-green-600',
  'bank transfer':  'bg-blue-50 text-blue-600',
  POS:              'bg-purple-50 text-purple-600',
  'mobile payment': 'bg-orange-50 text-orange-600',
};

const Expenses = ({ expenses, loading, error, getExpenses, deleteExpense, basePath = '/admin/expenses' }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  useEffect(() => { getExpenses(); }, [getExpenses]);

  const filtered = useMemo(() => {
    return expenses.filter(e => {
      const matchSearch = (e.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (e.paidTo || '').toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'all' || e.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [expenses, search, categoryFilter]);

  const summary = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const now = new Date();
    const thisMonth = expenses
      .filter(e => { const d = new Date(e.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); })
      .reduce((sum, e) => sum + (e.amount || 0), 0);
    const avg = expenses.length ? total / expenses.length : 0;
    const byCategory = {};
    expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + (e.amount || 0); });
    const topCat = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    return { total, thisMonth, avg, byCategory, topCat };
  }, [expenses]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleEdit = (e) => { setSelectedExpense(e); setShowEditModal(true); };
  const handleDelete = (e) => { setSelectedExpense(e); setShowDeleteModal(true); };
  const confirmDelete = async () => {
    await deleteExpense(selectedExpense._id);
    setShowDeleteModal(false);
    setSelectedExpense(null);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-sm text-gray-500 mt-0.5">{expenses.length} records total</p>
        </div>
        <Link
          to={`${basePath}/add`}
          className="flex items-center gap-2 bg-secondary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <FaPlus className="text-xs" /> Add Expense
        </Link>
      </div>

      {/* Summary Cards */}
      {!loading && expenses.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <FaWallet className="text-red-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Spent</p>
                <p className="text-lg font-bold text-gray-800">₦{summary.total.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">This Month</p>
                <p className="text-lg font-bold text-gray-800">₦{summary.thisMonth.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <FaChartBar className="text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Avg per Entry</p>
                <p className="text-lg font-bold text-gray-800">₦{Math.round(summary.avg).toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <FaTag className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Top Category</p>
                <p className="text-base font-bold text-gray-800 capitalize">{summary.topCat?.[0] || '—'}</p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Spend by Category</p>
            <div className="space-y-2">
              {Object.entries(summary.byCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, amt]) => {
                  const pct = summary.total ? Math.round((amt / summary.total) * 100) : 0;
                  return (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 capitalize w-24 shrink-0">{cat}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: categoryColor[cat] || '#9ca3af' }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-24 text-right">₦{amt.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by title or paid to..."
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
                categoryFilter === cat ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
            <p className="text-sm">Loading expenses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FaReceipt className="text-5xl mx-auto mb-3 opacity-30" />
            <p className="font-medium">No expenses found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500 font-semibold">
                <th className="py-3 px-5 text-left">Title</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Paid To</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map(e => (
                <tr key={e._id} className="hover:bg-gray-50 transition">
                  <td className="py-3.5 px-5">
                    <p className="font-semibold text-gray-800">{e.title}</p>
                    {e.note && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{e.note}</p>}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-800">
                    ₦{e.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${categoryStyle[e.category] || 'bg-gray-100 text-gray-500'}`}>
                      {e.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`capitalize text-xs px-2 py-1 rounded-full font-medium ${paymentStyle[e.paymentMethod] || 'bg-gray-100 text-gray-500'}`}>
                      {e.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 text-sm">{e.paidTo || '—'}</td>
                  <td className="py-3.5 px-4 text-gray-500 text-sm whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => handleEdit(e)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition cursor-pointer" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(e)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <p>Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition">←</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                <button key={pg} onClick={() => setCurrentPage(pg)} className={`px-3 py-1 rounded-lg border transition ${currentPage === pg ? 'bg-secondary text-white border-secondary' : 'border-gray-200 hover:bg-gray-50'}`}>{pg}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition">→</button>
            </div>
          </div>
        )}
      </div>

      <EditExpense isOpen={showEditModal} onClose={() => setShowEditModal(false)} expense={selectedExpense} />

      <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <FaTrash className="text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Delete Expense</h2>
              <p className="text-xs text-gray-500">This cannot be undone</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Delete <strong>{selectedExpense?.title}</strong> — ₦{selectedExpense?.amount?.toLocaleString()}?
          </p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer">Cancel</button>
            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm cursor-pointer">Delete</button>
          </div>
        </div>
      </GeneralModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: state.expenses.expenses,
  loading: state.expenses.loading,
  error: state.expenses.error,
});

export default connect(mapStateToProps, { getExpenses, deleteExpense })(Expenses);
