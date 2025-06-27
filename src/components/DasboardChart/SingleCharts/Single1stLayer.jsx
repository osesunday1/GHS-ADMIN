import MarketProfit from "./ChartCards/MarketProfit";
import RepeatedGuest from "./ChartCards/RepeatedGuest";
import TotalBooking from "./ChartCards/TotalBookings";
import TotalRevenue from "./ChartCards/TotalRevenue";

const Single1stLayer = ({filters}) => {
  

  return (
    <div className="flex flex-row flex-wrap mx-auto w-[1200px] justify-between my-2">
        <TotalBooking filters={filters}/>
        <TotalRevenue filters={filters} />
        <MarketProfit filters={filters} />
        <RepeatedGuest filters={filters} />
    </div>
  );
};

export default Single1stLayer;