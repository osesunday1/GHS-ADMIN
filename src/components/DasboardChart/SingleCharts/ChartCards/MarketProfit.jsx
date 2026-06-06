import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMarketProfit } from '../../../../store/actions/dashboard/marketProfitActions';
import InfoCard from '../Tempates/InfoCard';
import { FaChartLine } from 'react-icons/fa';
import CountUp from 'react-countup';

const MarketProfit = ({ filters, getMarketProfit, marketProfitData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getMarketProfit(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getMarketProfit, filters]);

  const total = marketProfitData?.totalProfit ?? 0;

  return (
    <InfoCard
      title="Market Profit"
      color="purple"
      icon={<FaChartLine />}
      amount={loading ? '—' : <><span className="text-xl font-semibold">₦</span><CountUp end={total} duration={1.2} separator="," preserveValue /></>}
      subtitle="product sales profit"
    />
  );
};

const mapStateToProps = (state) => ({
  marketProfitData: state.marketProfit.marketProfitData,
  loading: state.marketProfit.loading,
  error: state.marketProfit.error,
});

export default connect(mapStateToProps, { getMarketProfit })(MarketProfit);
