import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAverageLengthStay } from '../../../../store/actions/dashboard/averageLengthStayActions';
import InfoCard from '../Tempates/InfoCard';
import { FaBed } from 'react-icons/fa';
import CountUp from 'react-countup';

const AverageLengthStay = ({ filters, getAverageLengthStay, averageStayData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getAverageLengthStay(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getAverageLengthStay, filters]);

  const average = averageStayData?.averageLengthOfStay ?? 0;

  return (
    <InfoCard
      title="Avg. Length of Stay"
      color="teal"
      icon={<FaBed />}
      amount={
        loading ? '—' : (
          <CountUp end={average} duration={1.2} decimals={1} preserveValue />
        )
      }
      subtitle="nights per booking"
    />
  );
};

const mapStateToProps = (state) => ({
  averageStayData: state.averageLengthStay.averageStayData,
  loading: state.averageLengthStay.loading,
  error: state.averageLengthStay.error,
});

export default connect(mapStateToProps, { getAverageLengthStay })(AverageLengthStay);
