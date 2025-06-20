
import InfoCard from '../Tempates/InfoCard';
import { FaClipboard } from 'react-icons/fa'; 


const TotalBooking = () => {
  return (
    <div>
      <InfoCard 
        title="Total Bookings" 
        amount="22" 
        icon={<FaClipboard className="text-white text-xl" />} 
      />
    </div>
  );
};

export default TotalBooking;