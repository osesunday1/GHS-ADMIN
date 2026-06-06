import MarketProfit from "./ChartCards/MarketProfit";
import RepeatedGuest from "./ChartCards/RepeatedGuest";
import TotalBooking from "./ChartCards/TotalBookings";
import TotalRevenue from "./ChartCards/TotalRevenue";
import AverageLengthStay from "./ChartCards/AverageLengthStay";

const Single1stLayer = ({ filters }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      <TotalBooking filters={filters} />
      <TotalRevenue filters={filters} />
      <MarketProfit filters={filters} />
      <RepeatedGuest filters={filters} />
      <AverageLengthStay filters={filters} />
    </div>
  );
};

export default Single1stLayer;
