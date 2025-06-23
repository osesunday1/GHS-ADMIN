import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTotalBookings } from '../../../../store/actions/dashboard/totalBookingsActions';
import InfoCard from '../Tempates/InfoCard';
import { FaClipboard } from 'react-icons/fa';
import CountUp from 'react-countup';

const TotalBooking = ({ filters, getTotalBookings, totalBookingsData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getTotalBookings(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getTotalBookings, filters]);

  const total = totalBookingsData?.totalBookings ?? 0;

  return (
    <div>
      <InfoCard 
        title="Total Bookings" 
        amount={
          loading ? '...' : (
            <CountUp
              end={total}
              duration={1.5}
              separator=","
              preserveValue={true}
            />
          )} 
        icon={<FaClipboard className="text-white text-xl" />} 
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  totalBookingsData: state.totalBookings.totalBookingsData,
  loading: state.totalBookings.loading,
  error: state.totalBookings.error,
});

export default connect(mapStateToProps, { getTotalBookings })(TotalBooking);
