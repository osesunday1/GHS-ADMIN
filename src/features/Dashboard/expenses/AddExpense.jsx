import { useState } from 'react';
import { connect } from 'react-redux';
import { addExpense, getExpenses } from '../../../store/actions/expenseActions';

const AddExpense = ({ addExpense, getExpenses }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    paymentMethod: '',
    paidTo: '',
    note: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(formData);
    await getExpenses();
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: '',
      paymentMethod: '',
      paidTo: '',
      note: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select name="title" value={formData.title} onChange={handleChange} className="p-2 border rounded" required>
          <option value="" disabled>Select Expense Title</option>
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

        <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Note (optional)" className="p-2 border rounded"></textarea>

        <button type="submit" className="bg-secondary text-white py-2 rounded hover:bg-secondary-200">Add Expense</button>
      </form>
    </div>
  );
};

export default connect(null, { addExpense, getExpenses })(AddExpense);