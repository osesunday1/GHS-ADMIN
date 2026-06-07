import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateExpense, getExpenses } from '../../../store/actions/expenseActions';
import GeneralModal from '../../../components/common/GeneralModal';

const TITLES = ['Electricity','Laundry','Internet','DSTV','Fuel','Delivery Fee','Rent','Salary','Gas','Maintenance','Cleaning','Miscellaneous'];
const CATEGORIES = ['utilities','logistics','salary','rent','maintenance','cleaning','miscellaneous'];
const PAYMENT_METHODS = ['cash','bank transfer','POS','mobile payment'];
const PAID_TO = ['Landlord','NEPA','Internet Provider','Employee','Supplier','Mechanic','Cleaner','Other'];

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);

const EditExpense = ({ isOpen, onClose, expense, updateExpense, getExpenses }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setFormData({
        title:         expense.title || '',
        amount:        expense.amount || '',
        category:      expense.category || '',
        date:          expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
        paymentMethod: expense.paymentMethod || '',
        paidTo:        expense.paidTo || '',
        note:          expense.note || '',
      });
      setError('');
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateExpense(expense._id, formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !expense) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose} size="max-w-xl">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Edit Expense</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Editing: <span className="font-medium">{expense.title}</span> — ₦{expense.amount?.toLocaleString()}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title">
            <select name="title" value={formData.title} onChange={handleChange} className={inputClass} required>
              <option value="">Select title</option>
              {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>

          <Field label="Amount (₦)">
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="0" className={inputClass} required />
          </Field>

          <Field label="Category">
            <select name="category" value={formData.category} onChange={handleChange} className={inputClass} required>
              <option value="">Select category</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </Field>

          <Field label="Date">
            <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} required />
          </Field>

          <Field label="Payment Method">
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={inputClass}>
              <option value="">Select method</option>
              {PAYMENT_METHODS.map(m => (
                <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
              ))}
            </select>
          </Field>

          <Field label="Paid To">
            <select name="paidTo" value={formData.paidTo} onChange={handleChange} className={inputClass}>
              <option value="">Select recipient</option>
              {PAID_TO.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Note">
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Optional note"
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </Field>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm cursor-pointer">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-5 py-2 rounded-lg bg-secondary hover:opacity-90 text-white text-sm font-medium disabled:opacity-60 cursor-pointer">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </GeneralModal>
  );
};

export default connect(null, { updateExpense, getExpenses })(EditExpense);
