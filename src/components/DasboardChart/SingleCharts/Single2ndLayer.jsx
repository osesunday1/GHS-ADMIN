import ApartmentRevenue from "./ChartCards/ApartmentRevenue/ApartmentRevenue";
import RepeatGuests from "./ChartCards/RepeatGuestsList";
import TopProducts from "./ChartCards/TopProducts/TopProducts";

const Single2ndLayer = ({ filters }) => {
  return (
    <div className="flex flex-wrap gap-5 w-full">
      <ApartmentRevenue filters={filters} />
      <RepeatGuests filters={filters} />
      <TopProducts filters={filters} />
    </div>
  );
};

export default Single2ndLayer;
