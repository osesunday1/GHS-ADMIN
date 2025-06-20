import InfoCard from '../Tempates/InfoCard';
import { FaBath } from "react-icons/fa";




const RepeatedGuest = () => {
  return (
    <div>
      <InfoCard 
        title="Total Bookings" 
        amount="22" 
        icon={<FaBath className="text-white text-xl" />} 
      />
    </div>
  );
};

export default RepeatedGuest;