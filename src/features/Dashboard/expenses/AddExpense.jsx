import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addExpense, getExpenses } from '../../../store/actions/expenseActions';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const TITLES = ['Electricity','Laundry','Internet','DSTV','Fuel','Delivery Fee','Rent','Salary','Gas','Maintenance','Cleaning','Miscellaneous'];
const CATEGORIES = ['utilities','logistics','salary','rent','maintenance','cleaning','miscellaneous'];
const PAYMENT_METHODS = ['cash','bank transfer','POS','mobile payment'];
const PAID_TO = ['Landlord','NEPA','Internet Provider','Employee','Supplier','Mechanic','Cleaner','Other'];

const today = new Date().toISOString().split('T')[0];

const emptyForm = {
  title: '',
  amount: '',
  category: '',
  date: today,
  paymentMethod: '',
  paidTo: '',
  note: '',
};

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition";

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const AddExpense = ({ addExpense, getExpenses, basePath = '/admin/expenses' }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await addExpense(formData);
      setFormData({ ...emptyForm, date: today });
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to add expense');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to={basePath} className="text-gray-400 hover:text-gray-600 transition">
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
          <p className="text-sm text-gray-500">Record a new business expense</p>
        </div>
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
          <FaCheckCircle className="flex-shrink-0" />
          <span>Expense recorded successfully!</span>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Expense Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b pb-2">
            Expense Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expense Title" required>
              <select name="title" value={formData.title} onChange={handleChange} className={inputClass} required>
                <option value="">Select title</option>
                {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Amount (₦)" required>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={inputClass}
                required
              />
            </Field>

            <Field label="Category" required>
              <select name="category" value={formData.category} onChange={handleChange} className={inputClass} required>
                <option value="">Select category</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </Field>

            <Field label="Date" required>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </Field>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b pb-2">
            Payment Info
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Payment Method">
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={inputClass}>
                <option value="">Select method</option>
                {PAYMENT_METHODS.map(m => (
                  <option key={m} value={m} className="capitalize">{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                ))}
              </select>
            </Field>

            <Field label="Paid To">
              <select name="paidTo" value={formData.paidTo} onChange={handleChange} className={inputClass}>
                <option value="">Select recipient</option>
                {PAID_TO.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>

            <Field label="Note">
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Optional note..."
                rows={3}
                className={`${inputClass} col-span-2 resize-none`}
              />
            </Field>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link to={basePath} className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-secondary hover:opacity-90 text-white text-sm font-medium transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Saving...' : 'Save Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addExpense, getExpenses })(AddExpense);
