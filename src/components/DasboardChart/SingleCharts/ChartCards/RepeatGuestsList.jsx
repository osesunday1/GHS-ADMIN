import UtilityCard from "../Tempates/UtilityCard";


const repeatGuestData = [
  { name: 'John Doe', bookings: 8 },
  { name: 'Sarah Lee', bookings: 6 },
  { name: 'Michael Chen', bookings: 5 },
  { name: 'Aisha Karim', bookings: 4 },
  { name: 'Carlos Ramirez', bookings: 3 },
];

const RepeatGuests = () => {
  return (
    <UtilityCard title="Repeat Guests" minWidth="390px">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="pb-2">Guest Name</th>
            <th className="pb-2 text-right">Bookings</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {repeatGuestData.map((guest, index) => (
            <tr key={index} className="border-b last:border-b-0">
              <td className="py-5">{guest.name}</td>
              <td className="py-5 text-right font-medium">{guest.bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </UtilityCard>
  );
};

export default RepeatGuests;