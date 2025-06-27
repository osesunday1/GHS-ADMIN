import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMarketProfit } from '../../../../store/actions/dashboard/marketProfitActions';
import InfoCard from '../Tempates/InfoCard';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import CountUp from 'react-countup';

const MarketProfit = ({ filters, getMarketProfit, marketProfitData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getMarketProfit(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getMarketProfit, filters]);
  
  const total = marketProfitData?.totalProfit ?? 0;

  return (
    <div>
      <InfoCard 
        title="Total Product Profit (₦)" 
        amount={
          loading ? '...' : (
            <CountUp
              end={total}
              duration={1}
              separator=","
              preserveValue={true}
            />
          )
        }
        icon={<FaMoneyBillWaveAlt className="text-white text-xl" />} 
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  marketProfitData: state.marketProfit.marketProfitData,
  loading: state.marketProfit.loading,
  error: state.marketProfit.error,
});

export default connect(mapStateToProps, { getMarketProfit })(MarketProfit);