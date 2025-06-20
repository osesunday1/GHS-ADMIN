import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStockLogs, deleteStockLog } from '../../../store/actions/stockActions';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ViewStockHistory from './ViewStockHistory';
import EditStockHistory from './EditStockHistory';
import GeneralModal from '../../../components/common/GeneralModal';

const StockHistory = ({ logs, loading, error, getStockLogs, deleteStockLog }) => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getStockLogs();
  }, [getStockLogs]);

  const handleView = (log) => {
    setSelectedLog(log);
    setViewModalOpen(true);
  };

  const handleEdit = (log) => {
    setSelectedLog(log);
    setEditModalOpen(true);
  };

  const handleDelete = (log) => {
    setSelectedLog(log);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteStockLog(selectedLog._id);
      setShowDeleteModal(false);
      setSelectedLog(null);
      getStockLogs();
    } catch (err) {
      alert('Failed to delete log: ' + err.message);
    }
  };

  const groupLogsByTransaction = (logs) => {
  const grouped = {};
  logs.forEach((log) => {
    const tid = log.transactionId || 'no-tid';
    if (!grouped[tid]) grouped[tid] = [];
    grouped[tid].push(log);
  });
  return grouped;
};

const groupedLogs = groupLogsByTransaction(logs)

  return (
    <div className="bg-white p-6 rounded shadow max-w-[1200px] mx-auto">
      <h2 className="text-xl font-bold mb-4">Stock Movement History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="space-y-6">
          {Object.entries(groupedLogs).map(([transactionId, entries]) => {
                    const customerName = entries[0]?.customerName || '—';

                    return (
                      <div key={transactionId} className="border border-gray-300 rounded-md shadow-sm bg-primary-100 p-4 ">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="font-bold text-secondary">Transaction ID: {transactionId}</h3>
                            <p className="text-sm text-gray-600">Customer: {customerName}</p>
                          </div>
                          <button onClick={() => {
                            setSelectedLog({ transactionId, logs: entries });
                            setViewModalOpen(true);
                          }} className="text-blue-600 hover:text-blue-800 text-lg">
                            <FaEye />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {entries.map((log) => (
                            <div key={log._id} className="bg-white border rounded shadow p-4">
                              <div className="text-sm text-gray-500 mb-1">{new Date(log.date).toLocaleDateString()}</div>
                              <div className="font-semibold">{log.productId?.name || '—'}</div>
                              <div className="text-xs text-gray-600">Type: {log.changeType}</div>
                              <div className="text-xs text-gray-600">Qty: {log.quantityChanged}</div>
                              <div className="text-xs text-gray-600">Unit: ₦{log.unitPrice?.toLocaleString() || '—'}</div>
                              <div className="text-xs text-gray-600">Total: ₦{(log.unitPrice * log.quantityChanged)?.toLocaleString() || '—'}</div>

                              <div className="flex justify-end gap-2 text-sm text-gray-600">
                                <button onClick={() => handleEdit(log)} className="hover:text-green-600"><FaEdit /></button>
                                <button onClick={() => handleDelete(log)} className="hover:text-red-600"><FaTrash /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

              {logs.length === 0 && (
                <p className="text-center py-6 text-gray-500">No stock movement yet.</p>
              )}
            </div>

          {/* View Modal */}
          <ViewStockHistory isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} log={selectedLog} />

          {/* Edit Modal */}
          <EditStockHistory isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} log={selectedLog} />

          {/* Delete Confirmation */}
          <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
            <div className="p-4">
              <h2 className="text-lg font-bold text-red-600 mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this log?</p>
              <div className="mt-6 flex justify-end gap-4">
                <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">Yes, Delete</button>
              </div>
            </div>
          </GeneralModal>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  logs: state.stock.logs,
  loading: state.stock.loading,
  error: state.stock.error,
});

export default connect(mapStateToProps, { getStockLogs, deleteStockLog })(StockHistory);
