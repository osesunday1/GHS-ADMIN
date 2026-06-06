import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRepeatGuests } from '../../../../store/actions/dashboard/repeatGuestActions';
import InfoCard from '../Tempates/InfoCard';
import { FaUserFriends } from 'react-icons/fa';
import CountUp from 'react-countup';

const RepeatedGuest = ({ filters, getRepeatGuests, repeatGuestData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getRepeatGuests(filters.dateRange.start, filters.dateRange.end);
    }
  }, [filters, getRepeatGuests]);

  const total = repeatGuestData?.repeatGuestCount ?? 0;

  return (
    <InfoCard
      title="Repeat Guests"
      color="orange"
      icon={<FaUserFriends />}
      amount={loading ? '—' : <CountUp end={total} duration={1.2} separator="," preserveValue />}
      subtitle="returning guests"
    />
  );
};

const mapStateToProps = (state) => ({
  repeatGuestData: state.repeatGuest.repeatGuestData,
  loading: state.repeatGuest.loading,
  error: state.repeatGuest.error,
});

export default connect(mapStateToProps, { getRepeatGuests })(RepeatedGuest);
