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
    <InfoCard
      title="Total Revenue"
      color="green"
      icon={<FaMoneyBillWaveAlt />}
      amount={loading ? '—' : <><span className="text-xl font-semibold">₦</span><CountUp end={total} duration={1.2} separator="," preserveValue /></>}
      subtitle="expected revenue"
    />
  );
};

const mapStateToProps = (state) => ({
  totalRevenueData: state.totalRevenue.totalRevenueData,
  loading: state.totalRevenue.loading,
  error: state.totalRevenue.error,
});

export default connect(mapStateToProps, { getTotalRevenue })(TotalRevenue);
