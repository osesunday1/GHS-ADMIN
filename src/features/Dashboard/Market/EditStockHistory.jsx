import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStockLog, getStockLogs } from '../../../store/actions/stockActions';
import GeneralModal from '../../../components/common/GeneralModal';

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition";

const EditStockHistory = ({ isOpen, onClose, log, updateStockLog, getStockLogs }) => {
  const [formData, setFormData] = useState({ quantityChanged: '', note: '', customerName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (log) {
      setFormData({
        quantityChanged: log.quantityChanged ?? '',
        note: log.note || '',
        customerName: log.customerName || '',
      });
      setError('');
    }
  }, [log]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateStockLog(log._id, formData);
      getStockLogs();
      onClose();
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !log) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Edit Stock Entry</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Product: <span className="font-medium">{log.productId?.name || '—'}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
          <input
            type="number"
            name="quantityChanged"
            value={formData.quantityChanged}
            onChange={handleChange}
            min="1"
            className={inputClass}
            required
          />
          <p className="text-xs text-gray-400 mt-1">Inventory will be adjusted based on the difference</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Note</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Optional note"
            className={inputClass}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer"
          >
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

export default connect(null, { updateStockLog, getStockLogs })(EditStockHistory);
