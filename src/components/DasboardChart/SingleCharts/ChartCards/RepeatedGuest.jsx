import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRepeatGuests } from '../../../../store/actions/dashboard/repeatGuestActions';
import InfoCard from '../Tempates/InfoCard';
import { FaBath } from 'react-icons/fa';
import CountUp from 'react-countup';

const RepeatedGuest = ({ filters, getRepeatGuests, repeatGuestData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getRepeatGuests(filters.dateRange.start, filters.dateRange.end);
    }
  }, [filters, getRepeatGuests]);

  const total = repeatGuestData?.repeatGuestCount ?? 0;

  return (
    <div>
      <InfoCard 
        title="Repeated Guests" 
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
        icon={<FaBath className="text-white text-xl" />} 
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  repeatGuestData: state.repeatGuest.repeatGuestData,
  loading: state.repeatGuest.loading,
  error: state.repeatGuest.error,
});

export default connect(mapStateToProps, { getRepeatGuests })(RepeatedGuest);