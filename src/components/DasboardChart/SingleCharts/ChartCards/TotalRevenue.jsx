import InfoCard from '../Tempates/InfoCard';
import { FaMoneyBillWaveAlt } from "react-icons/fa";

const TotalRevenue = () => {
  return (
    <div>
      <InfoCard 
        title="Total Revenue" 
        amount="22,000" 
        icon={<FaMoneyBillWaveAlt className="text-white text-xl" />} 
      />
    </div>
  );
};

export default TotalRevenue;