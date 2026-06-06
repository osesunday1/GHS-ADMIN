import LowStock from "./ChartCards/LowStock/LowStock";
import TopExpenses from "./ChartCards/TopExpenses/TopExpenses";

const Single3rdLayer = ({ filters }) => {
  return (
    <div className="flex flex-wrap gap-5 w-full">
      <TopExpenses filters={filters} />
      <LowStock />
    </div>
  );
};

export default Single3rdLayer;
