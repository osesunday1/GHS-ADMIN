import MarketProfit from "./ChartCards/MarketProfit";
import RepeatedGuest from "./ChartCards/RepeatedGuest";
import TotalBooking from "./ChartCards/TotalBookings";
import TotalRevenue from "./ChartCards/TotalRevenue";
import AverageLengthStay from "./ChartCards/AverageLengthStay";
import NetProfit from "./ChartCards/NetProfit";

const Single1stLayer = ({ filters }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
      <TotalBooking filters={filters} />
      <TotalRevenue filters={filters} />
      <MarketProfit filters={filters} />
      <RepeatedGuest filters={filters} />
      <AverageLengthStay filters={filters} />
      <NetProfit />
    </div>
  );
};

export default Single1stLayer;
