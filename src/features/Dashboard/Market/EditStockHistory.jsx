import { useState, useEffect } from 'react';
import GeneralModal from '../../../components/common/GeneralModal';
import { connect } from 'react-redux';
import { getStockLogs } from '../../../store/actions/stockActions';
import { updateStockLog } from '../../../store/actions/stockActions';
// You’ll connect updateStockLog as needed

const EditStockHistory = ({ isOpen, onClose, log, updateStockLog, getStockLogs }) => {
  const [formData, setFormData] = useState({
    quantityChanged: '',
    note: '',
    customerName: '',
  });

  useEffect(() => {
    if (log) {
      setFormData({
        quantityChanged: log.quantityChanged,
        note: log.note || '',
        customerName: log.customerName || '',
      });
    }
  }, [log]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStockLog(log._id, formData);
      getStockLogs();
      onClose();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  if (!isOpen || !log) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <h2 className="text-xl font-bold mb-2 text-green-600">Edit Stock Log</h2>

        <div>
          <label className="block text-sm mb-1">Quantity</label>
          <input type="number" name="quantityChanged" value={formData.quantityChanged} onChange={handleChange} className="p-2 border rounded w-full" />
        </div>

        <div>
          <label className="block text-sm mb-1">Customer</label>
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="p-2 border rounded w-full" />
        </div>

        <div>
          <label className="block text-sm mb-1">Note</label>
          <input type="text" name="note" value={formData.note} onChange={handleChange} className="p-2 border rounded w-full" />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </form>
    </GeneralModal>
  );
};

export default connect(null, { updateStockLog, getStockLogs })(EditStockHistory);