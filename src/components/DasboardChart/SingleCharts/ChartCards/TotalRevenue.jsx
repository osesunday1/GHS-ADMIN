import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTotalRevenue } from '../../../../store/actions/dashboard/totalRevenueActions';
import InfoCard from '../Tempates/InfoCard';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import CountUp from 'react-countup';

const TotalRevenue = ({ filters, getTotalRevenue, totalRevenueData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getTotalRevenue(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getTotalRevenue, filters]);

  const total = totalRevenueData?.totalExpectedRevenue ?? 0;

  return (
    <div>
      <InfoCard 
        title="Total Revenue (₦)" 
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
  totalRevenueData: state.totalRevenue.totalRevenueData,
  loading: state.totalRevenue.loading,
  error: state.totalRevenue.error,
});

export default connect(mapStateToProps, { getTotalRevenue })(TotalRevenue);
