import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRepeatGuests } from '../../../../store/actions/dashboard/repeatGuestActions';
import UtilityCard from '../Tempates/UtilityCard';

const RepeatGuests = ({ getRepeatGuests, repeatGuestData, loading }) => {
  useEffect(() => {
    getRepeatGuests();
  }, [getRepeatGuests]);

  const guests = repeatGuestData?.repeatGuests || [];

  return (
    <UtilityCard title="Repeat Guests" minWidth="390px">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-2">Guest Name</th>
              <th className="pb-2 text-right">Bookings</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {guests.map((guest, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-5">
                  {`${guest._id.firstName} ${guest._id.lastName}`
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')}
                </td>
                <td className="py-5 text-right font-medium">{guest.bookingCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  repeatGuestData: state.repeatGuest.repeatGuestData,
  loading: state.repeatGuest.loading,
  error: state.repeatGuest.error,
});

export default connect(mapStateToProps, { getRepeatGuests })(RepeatGuests);