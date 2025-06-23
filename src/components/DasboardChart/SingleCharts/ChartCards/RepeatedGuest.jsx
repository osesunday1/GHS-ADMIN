import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRepeatGuests } from '../../../../store/actions/dashboard/repeatGuestActions';
import InfoCard from '../Tempates/InfoCard';
import { FaBath } from 'react-icons/fa';
import CountUp from 'react-countup';

const RepeatedGuest = ({ getRepeatGuests, repeatGuestData, loading }) => {
  useEffect(() => {
    getRepeatGuests();
  }, [getRepeatGuests]);

  const total = repeatGuestData?.repeatGuestCount ?? 0;

  return (
    <div>
      <InfoCard 
        title="Repeated Guest" 
        amount={loading ? '...' : (
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