import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAverageLengthStay } from '../../../../store/actions/dashboard/averageLengthStayActions';
import InfoCard from '../Tempates/InfoCard';
import { FaBed } from 'react-icons/fa';

const AverageLengthStay = ({ filters, getAverageLengthStay, averageStayData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getAverageLengthStay(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getAverageLengthStay, filters]);

  const average = averageStayData?.averageLengthOfStay ?? 0;

  return (
    <div>
      <InfoCard 
        title="Average Length Stay" 
        amount={loading ? '...' : average.toFixed(1)} 
        icon={<FaBed className="text-white text-xl" />} 
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  averageStayData: state.averageLengthStay.averageStayData,
  loading: state.averageLengthStay.loading,
  error: state.averageLengthStay.error,
});

export default connect(mapStateToProps, { getAverageLengthStay })(AverageLengthStay);