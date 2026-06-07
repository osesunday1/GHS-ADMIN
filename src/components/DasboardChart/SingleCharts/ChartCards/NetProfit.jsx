import { connect } from 'react-redux';
import { FaBalanceScale } from 'react-icons/fa';
import CountUp from 'react-countup';

const NetProfit = ({ totalRevenueData, expenseDashboard, loadingRevenue, loadingExpenses }) => {
  const loading = loadingRevenue || loadingExpenses;
  const revenue  = totalRevenueData?.totalExpectedRevenue ?? 0;
  const expenses = expenseDashboard?.totalExpenses         ?? 0;
  const net      = revenue - expenses;
  const isProfit = net >= 0;

  const border = isProfit ? 'border-green-500' : 'border-red-500';
  const iconBg  = isProfit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
  const amtColor = isProfit ? 'text-green-700' : 'text-red-600';

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${border} p-5 flex items-start justify-between`}>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">Net Profit</p>
        <p className={`text-3xl font-bold mt-2 leading-tight ${amtColor}`}>
          {loading ? '—' : (
            <>
              <span className="text-xl font-semibold">₦</span>
              <CountUp end={Math.abs(net)} duration={1.2} separator="," preserveValue />
            </>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {loading ? '' : (isProfit ? 'surplus this period' : 'deficit this period')}
        </p>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${iconBg}`}>
        <FaBalanceScale className="text-lg" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  totalRevenueData:  state.totalRevenue.totalRevenueData,
  loadingRevenue:    state.totalRevenue.loading,
  expenseDashboard:  state.expenseDashboard,
  loadingExpenses:   state.expenseDashboard.loading,
});

export default connect(mapStateToProps)(NetProfit);
