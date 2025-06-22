import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateExpense, getExpenses } from '../../../store/actions/expenseActions';
import GeneralModal from '../../../components/common/GeneralModal';

const EditExpense = ({ isOpen, onClose, expense, updateExpense, getExpenses }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || '',
        amount: expense.amount || '',
        category: expense.category || '',
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
        paymentMethod: expense.paymentMethod || '',
        paidTo: expense.paidTo || '',
        note: expense.note || '',
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(expense._id, formData);
      await getExpenses();
      onClose();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  if (!isOpen || !expense) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-4">
        <select name="title" value={formData.title} onChange={handleChange} className="p-2 border rounded" required>
          <option value="" disabled>Select Title</option>
          <option value="Electricity">Electricity</option>
          <option value="Laundry">Laundry</option>
          <option value="Internet">Internet</option>
          <option value="DSTV">DSTV</option>
          <option value="Fuel">Fuel</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Gas">Gas</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="p-2 border rounded" required />

        <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded" required>
          <option value="" disabled>Select Category</option>
          <option value="utilities">Utilities</option>
          <option value="logistics">Logistics</option>
          <option value="salary">Salary</option>
          <option value="rent">Rent</option>
          <option value="maintenance">Maintenance</option>
          <option value="cleaning">Cleaning</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
            />
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="p-2 border rounded">
          <option value="" disabled>Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="bank transfer">Bank Transfer</option>
          <option value="POS">POS</option>
          <option value="mobile payment">Mobile Payment</option>
        </select>

        <select name="paidTo" value={formData.paidTo} onChange={handleChange} className="p-2 border rounded">
          <option value="" disabled>Paid To</option>
          <option value="Landlord">Landlord</option>
          <option value="NEPA">NEPA</option>
          <option value="Water Board">Water Board</option>
          <option value="Internet Provider">Internet Provider</option>
          <option value="Employee">Employee</option>
          <option value="Supplier">Supplier</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Other">Other</option>
        </select>

        <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Note (optional)" className="col-span-2 p-2 border rounded"></textarea>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-2">Update Expense</button>
      </form>
    </GeneralModal>
  );
};

export default connect(null, { updateExpense, getExpenses })(EditExpense);