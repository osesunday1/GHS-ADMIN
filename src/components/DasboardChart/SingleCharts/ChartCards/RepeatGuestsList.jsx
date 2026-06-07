import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRepeatGuests } from '../../../../store/actions/dashboard/repeatGuestActions';
import UtilityCard from '../Tempates/UtilityCard';
import { FaUserFriends } from 'react-icons/fa';

const RepeatGuests = ({ getRepeatGuests, repeatGuestData, loading }) => {
  useEffect(() => {
    getRepeatGuests();
  }, [getRepeatGuests]);

  const guests = repeatGuestData?.repeatGuests || [];

  return (
    <UtilityCard title="Repeat Guests" minWidth="390px">
      {loading ? (
        <div className="flex items-center gap-2 py-8 justify-center text-gray-400 text-sm">
          <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full" />
          Loading...
        </div>
      ) : guests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <FaUserFriends className="text-4xl mb-3" />
          <p className="text-sm font-medium text-gray-400">No repeat guests for this period</p>
          <p className="text-xs text-gray-300 mt-1">All guests are first-time visitors</p>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-60">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b sticky top-0 bg-white">
              <tr>
                <th className="pb-2">Guest Name</th>
                <th className="pb-2 text-right">Bookings</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {guests.map((guest, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-3">
                    {`${guest._id.firstName} ${guest._id.lastName}`
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')}
                  </td>
                  <td className="py-3 text-right font-semibold text-secondary">{guest.bookingCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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