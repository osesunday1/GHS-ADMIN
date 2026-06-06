import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTotalExpenses } from '../../../../../store/actions/dashboard/expensesActions';
import UtilityCard from '../../Tempates/UtilityCard';
import TopExpensesChart from './TopExpensesChart';

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
        <p className="text-gray-500">Loading...</p>
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
