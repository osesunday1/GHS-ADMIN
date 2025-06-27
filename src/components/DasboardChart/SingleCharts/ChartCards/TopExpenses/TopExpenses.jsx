import { useEffect } from 'react';
import { connect } from 'react-redux';
import UtilityCard from '../../Tempates/UtilityCard';
import Box from '../../Tempates/Box';
import TopExpensesChart from './TopExpensesChart';
import { getTotalExpenses } from '../../../../../store/actions/dashboard/expensesActions';

const TopExpenses = ({ filters, breakdown = [], loading, getTotalExpenses }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
    getTotalExpenses(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getTotalExpenses, filters]);

  const colors = ['#6c5ce7', '#00cec9', '#e17055', '#fd79a8', '#ffc107', '#ff9f43'];

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  const chartData = breakdown.map((item) => ({
    ...item,
    percentage: total ? (item.amount / total) * 100 : 0,
  }));

  return (
    <UtilityCard title="Total Expenses" maxWidth="395px">
      <div className="flex flex-col items-center">
        <TopExpensesChart data={chartData} colors={colors} total={total} />

        <div className="mt-1 grid grid-cols-2 gap-4 w-full">
          {chartData.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Box color={colors[i % colors.length]} />
                <span className="text-gray-700 font-medium">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-sm">↑</span>
                <span className="text-gray-500 font-semibold">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  breakdown: state.expenseDashboard.breakdown,
  loading: state.expenseDashboard.loading,
});

export default connect(mapStateToProps, { getTotalExpenses })(TopExpenses);