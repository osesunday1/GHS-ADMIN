import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTotalExpenses } from '../../../../../store/actions/dashboard/expensesActions';
import UtilityCard from '../../Tempates/UtilityCard';
import { FaReceipt } from 'react-icons/fa';

const rowColors = ['#ff6b6b', '#ffc107', '#845ef7', '#4dabf7', '#20c997'];

const TopExpenses = ({ filters, getTotalExpenses, breakdown, loading, totalExpenses }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getTotalExpenses(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getTotalExpenses, filters]);

  return (
    <UtilityCard title="Top Expenses" maxWidth="395px">
      {loading ? (
        <div className="flex items-center gap-2 py-8 justify-center text-gray-400 text-sm">
          <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full" />
          Loading...
        </div>
      ) : !breakdown || breakdown.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <FaReceipt className="text-4xl mb-3" />
          <p className="text-sm font-medium text-gray-400">No expense data for this period</p>
          <p className="text-xs text-gray-300 mt-1">Try adjusting the date range</p>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[260px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
              <th className="pb-2 text-left font-medium">#</th>
              <th className="pb-2 text-left font-medium">Title</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {breakdown.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="py-2.5 pr-2">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: rowColors[i % rowColors.length] }}
                  >
                    {i + 1}
                  </span>
                </td>
                <td className="py-2.5 text-gray-700 font-medium capitalize">{item.title}</td>
                <td className="py-2.5 text-right font-bold text-gray-800">₦{item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      {!loading && totalExpenses > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Total</span>
          <span className="text-sm font-bold text-gray-800">₦{totalExpenses.toLocaleString()}</span>
        </div>
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  breakdown: state.expenseDashboard.breakdown,
  totalExpenses: state.expenseDashboard.totalExpenses,
  loading: state.expenseDashboard.loading,
  error: state.expenseDashboard.error,
});

export default connect(mapStateToProps, { getTotalExpenses })(TopExpenses);
