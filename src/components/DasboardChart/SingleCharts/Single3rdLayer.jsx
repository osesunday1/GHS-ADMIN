
import TopTurnover from "./ChartCards/ProductTurnover/TopTurnover";
import TopExpenses from "./ChartCards/TopExpenses/TopExpenses";


const Single3rdLayer = () => {
  return (
    <div className="flex flex-row flex-wrap mx-auto w-[1200px] justify-between my-2">
        <TopExpenses/>
        <TopTurnover/>
    </div>
  );
};

export default Single3rdLayer;