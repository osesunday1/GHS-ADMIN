import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getExpenses, deleteExpense } from '../../../store/actions/expenseActions';
import EditExpense from './EditExpense';
import GeneralModal from '../../../components/common/GeneralModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Expenses = ({ expenses, loading, error, getExpenses, deleteExpense }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

    //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const expensePerPage = 13;
  const indexOfLastExpense = currentPage * expensePerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensePerPage;
  const currentExpense = expenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(expenses.length / expensePerPage);


  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const handleDelete = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deleteExpense(selectedExpense._id);
    setShowDeleteModal(false);
    setSelectedExpense(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-[1200px] mx-auto h-[90%]">
      <h2 className="text-xl font-bold mb-4">Expense History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto h-[80vh]">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead>
              <tr className="bg-secondary-100 text-secondary text-left">
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Payment</th>
                <th className="py-2 px-4 border-b">Paid To</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentExpense.map((e, index) => (
                <tr key={e._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-primary-100'} hover:bg-gray-100`}>
                  <td className="py-4 px-4">{e.title}</td>
                  <td className="py-4 px-4">₦{e.amount}</td>
                  <td className="py-4 px-4">{e.category}</td>
                  <td className="py-4 px-4">{e.paymentMethod}</td>
                  <td className="py-4 px-4">{e.paidTo}</td>
                  <td className="py-4 px-4">{new Date(e.date).toLocaleDateString('en-CA', { timeZone: 'UTC' })}</td>
                   
                  <td className="py-4 px-4 flex gap-2">
                    <button onClick={() => handleEdit(e)} className="text-green-600"><FaEdit /></button>
                    <button onClick={() => handleDelete(e)} className="text-red-600"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

           {/* pagination */}

          {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2 ">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 rounded cursor-pointer ${
                        currentPage === index + 1
                          ? 'bg-secondary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}

        </div>
      )}

      {/* Modals */}
      <EditExpense
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        expense={selectedExpense}
      />

      <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold text-red-600 mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this expense?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">Yes, Delete</button>
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