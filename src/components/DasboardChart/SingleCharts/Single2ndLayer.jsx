import ApartmentRevenue from "./ChartCards/ApartmentRevenue/ApartmentRevenue";
import RepeatGuests from "./ChartCards/RepeatGuestsList";
import TopProducts from "./ChartCards/TopProducts/TopProducts";
import BookingStatus from "./ChartCards/BookingStatus/BookingStatus";

const Single2ndLayer = ({ filters }) => {
  return (
    <div className="flex flex-wrap gap-5 w-full">
      <BookingStatus filters={filters} />
      <ApartmentRevenue filters={filters} />
      <RepeatGuests filters={filters} />
      <TopProducts filters={filters} />
    </div>
  );
};

export default Single2ndLayer;
