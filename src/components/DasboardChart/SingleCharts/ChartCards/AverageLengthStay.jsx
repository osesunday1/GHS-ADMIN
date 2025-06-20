import { FaBed } from "react-icons/fa";
import InfoCard from '../Tempates/InfoCard';


const AverageLengthStay = () => {
  return (
    <div>
      <InfoCard 
        title="Average Length Stay" 
        amount="22" 
        icon={<FaBed className="text-white text-xl" />} 
      />
    </div>
  );
};

export default AverageLengthStay;