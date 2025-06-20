import AverageLengthStay from "./ChartCards/AverageLengthStay";
import RepeatedGuest from "./ChartCards/RepeatedGuest";
import TotalBooking from "./ChartCards/TotalBookings";
import TotalRevenue from "./ChartCards/TotalRevenue";

const Single1stLayer = () => {
  return (
    <div className="flex flex-row flex-wrap mx-auto w-[1200px] justify-between my-2">
        <TotalBooking/>
        <TotalRevenue />
        <AverageLengthStay/>
        <RepeatedGuest/>
    </div>
  );
};

export default Single1stLayer;