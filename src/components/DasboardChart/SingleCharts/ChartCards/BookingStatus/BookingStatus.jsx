import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBookingStatus } from '../../../../../store/actions/dashboard/bookingStatusActions';
import UtilityCard from '../../Tempates/UtilityCard';
import BookingStatusChart from './BookingStatusChart';
import { FaChartPie } from 'react-icons/fa';

const BookingStatus = ({ filters, getBookingStatus, statusData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getBookingStatus(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getBookingStatus, filters]);

  const chartData = [
    { key: 'upcoming', value: statusData?.upcoming ?? 0 },
    { key: 'in',       value: statusData?.in       ?? 0 },
    { key: 'out',      value: statusData?.out      ?? 0 },
  ];

  const hasData = chartData.some(d => d.value > 0);

  return (
    <UtilityCard title="Booking Status">
      {loading ? (
        <div className="flex items-center gap-2 py-8 justify-center text-gray-400 text-sm">
          <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full" />
          Loading...
        </div>
      ) : !hasData ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <FaChartPie className="text-4xl mb-3" />
          <p className="text-sm font-medium text-gray-400">No bookings for this period</p>
          <p className="text-xs text-gray-300 mt-1">Try adjusting the date range</p>
        </div>
      ) : (
        <BookingStatusChart data={chartData} />
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  statusData: state.bookingStatus.statusData,
  loading: state.bookingStatus.loading,
});

export default connect(mapStateToProps, { getBookingStatus })(BookingStatus);
