import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { getStockLogs, deleteStockLog } from '../../../store/actions/stockActions';
import { FaEye, FaEdit, FaTrash, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ViewStockHistory from './ViewStockHistory';
import EditStockHistory from './EditStockHistory';
import GeneralModal from '../../../components/common/GeneralModal';

const StockHistory = ({ logs, loading, error, getStockLogs, deleteStockLog }) => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedTxns, setExpandedTxns] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => { getStockLogs(); }, [getStockLogs]);

  const grouped = useMemo(() => {
    const map = {};
    logs.forEach(log => {
      const tid = log.transactionId || 'no-tid';
      if (!map[tid]) map[tid] = [];
      map[tid].push(log);
    });
    return map;
  }, [logs]);

  const filteredEntries = useMemo(() => {
    return Object.entries(grouped).filter(([, entries]) => {
      const customer = entries[0]?.customerName || '';
      return customer.toLowerCase().includes(search.toLowerCase());
    });
  }, [grouped, search]);

  const totalPages = Math.ceil(filteredEntries.length / perPage);
  const paginated = filteredEntries.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleExpand = (tid) =>
    setExpandedTxns(prev => ({ ...prev, [tid]: !prev[tid] }));

  const handleDelete = (log) => { setSelectedLog(log); setShowDeleteModal(true); };
  const handleEdit = (log) => { setSelectedLog(log); setEditModalOpen(true); };

  const confirmDelete = async () => {
    try {
      await deleteStockLog(selectedLog._id);
      setShowDeleteModal(false);
      setSelectedLog(null);
      getStockLogs();
    } catch {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock History</h1>
          <p className="text-sm text-gray-500 mt-0.5">{Object.keys(grouped).length} transactions recorded</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>
      </div>

      {/* Transactions */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full mb-3"></div>
          <p className="text-sm">Loading transactions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 text-sm">{error}</div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="font-medium">No transactions found</p>
          <p className="text-sm mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map(([transactionId, entries]) => {
            const customerName = entries[0]?.customerName || '—';
            const date = entries[0]?.date ? new Date(entries[0].date) : null;
            const totalAmount = entries.reduce((s, e) => s + (e.total || 0), 0);
            const isExpanded = expandedTxns[transactionId];

            return (
              <div key={transactionId} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {/* Transaction Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => toggleExpand(transactionId)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0">
                      {customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{customerName}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{transactionId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="text-sm text-gray-700 font-medium">
                        {date ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-400">Items</p>
                      <p className="text-sm text-gray-700 font-medium">{entries.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="text-sm font-bold text-secondary">₦{totalAmount.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedLog({ transactionId, logs: entries });
                          setViewModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                        title="View Invoice"
                      >
                        <FaEye />
                      </button>
                      <span className="text-gray-400">
                        {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Line Items */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs uppercase text-gray-500 tracking-wide border-b border-gray-200">
                          <th className="pb-2 text-left font-semibold">Product</th>
                          <th className="pb-2 text-right font-semibold">Qty</th>
                          <th className="pb-2 text-right font-semibold">Unit Price</th>
                          <th className="pb-2 text-right font-semibold">Total</th>
                          <th className="pb-2 text-center font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {entries.map(log => (
                          <tr key={log._id} className="hover:bg-white transition">
                            <td className="py-2.5 text-gray-800 font-medium">
                              {log.productId?.name || '—'}
                              {log.note && <p className="text-xs text-gray-400 font-normal">{log.note}</p>}
                            </td>
                            <td className="py-2.5 text-right text-gray-600">{log.quantityChanged}</td>
                            <td className="py-2.5 text-right text-gray-600">₦{log.unitPrice?.toLocaleString() || '—'}</td>
                            <td className="py-2.5 text-right font-semibold text-gray-800">
                              ₦{(log.unitPrice * log.quantityChanged)?.toLocaleString() || '—'}
                            </td>
                            <td className="py-2.5">
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => handleEdit(log)}
                                  className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition cursor-pointer"
                                  title="Edit"
                                >
                                  <FaEdit className="text-xs" />
                                </button>
                                <button
                                  onClick={() => handleDelete(log)}
                                  className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                                  title="Delete"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500 pt-1">
          <p>Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filteredEntries.length)} of {filteredEntries.length} transactions</p>
          <div className="flex gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-white transition">←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
              <button key={pg} onClick={() => setCurrentPage(pg)} className={`px-3 py-1 rounded-lg border transition ${currentPage === pg ? 'bg-secondary text-white border-secondary' : 'border-gray-200 hover:bg-white'}`}>{pg}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-white transition">→</button>
          </div>
        </div>
      )}

      <ViewStockHistory isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} log={selectedLog} />
      <EditStockHistory isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} log={selectedLog} />

      <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <FaTrash className="text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Delete Log Entry</h2>
              <p className="text-xs text-gray-500">Stock will be reversed</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete this entry for <strong>{selectedLog?.productId?.name}</strong>?
            The inventory quantity will be adjusted automatically.
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
  logs: state.stock.logs,
  loading: state.stock.loading,
  error: state.stock.error,
});

export default connect(mapStateToProps, { getStockLogs, deleteStockLog })(StockHistory);
