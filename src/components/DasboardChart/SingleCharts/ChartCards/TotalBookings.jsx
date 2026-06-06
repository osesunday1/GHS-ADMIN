import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTotalBookings } from '../../../../store/actions/dashboard/totalBookingsActions';
import InfoCard from '../Tempates/InfoCard';
import { FaCalendarAlt } from 'react-icons/fa';
import CountUp from 'react-countup';

const TotalBooking = ({ filters, getTotalBookings, totalBookingsData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getTotalBookings(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getTotalBookings, filters]);

  const total = totalBookingsData?.totalBookings ?? 0;

  return (
    <InfoCard
      title="Total Bookings"
      color="blue"
      icon={<FaCalendarAlt />}
      amount={loading ? '—' : <CountUp end={total} duration={1.2} separator="," preserveValue />}
      subtitle="reservations"
    />
  );
};

const mapStateToProps = (state) => ({
  totalBookingsData: state.totalBookings.totalBookingsData,
  loading: state.totalBookings.loading,
  error: state.totalBookings.error,
});

export default connect(mapStateToProps, { getTotalBookings })(TotalBooking);
