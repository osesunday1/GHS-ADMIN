import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTotalExpenses } from '../../../../../store/actions/dashboard/expensesActions';
import UtilityCard from '../../Tempates/UtilityCard';
import TopExpensesChart from './TopExpensesChart';
import { FaChartBar } from 'react-icons/fa';

const colors = ['#ff6b6b', '#ffc107', '#845ef7', '#4dabf7', '#20c997'];

const TopExpenses = ({ filters, getTotalExpenses, breakdown, loading }) => {
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
          <FaChartBar className="text-4xl mb-3" />
          <p className="text-sm font-medium text-gray-400">No expense data for this period</p>
          <p className="text-xs text-gray-300 mt-1">Try adjusting the date range</p>
        </div>
      ) : (
        <TopExpensesChart data={breakdown} colors={colors} />
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  breakdown: state.expenseDashboard.breakdown,
  loading: state.expenseDashboard.loading,
  error: state.expenseDashboard.error,
});

export default connect(mapStateToProps, { getTotalExpenses })(TopExpenses);
