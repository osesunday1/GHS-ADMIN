
import LowStock from "./ChartCards/LowStock/LowStock";
import TopExpenses from "./ChartCards/TopExpenses/TopExpenses";


const Single3rdLayer = () => {
  return (
    <div className="flex flex-row flex-wrap mx-auto w-[1200px] justify-between my-2">
        <TopExpenses/>
        <LowStock/>
    </div>
  );
};

export default Single3rdLayer;