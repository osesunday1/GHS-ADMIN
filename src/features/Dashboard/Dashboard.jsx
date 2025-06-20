import { useState } from "react";
import DashboardTopBar from "../../components/DasboardChart/Topbar/DashboardTopBar";
import Single1stLayer from "../../components/DasboardChart/SingleCharts/Single1stLayer";
import Comp1stLayer from "../../components/DasboardChart/CompCharts/Comp1stLayer";
import Single2ndLayer from "../../components/DasboardChart/SingleCharts/Single2ndLayer";
const Dashboard = () => {


  // Calculate default date range for filters
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const firstDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);


    // Filters state: passed down to all child layers
  const [filters, setFilters] = useState({
    dateRange: {
      start: firstDayOfMonth.toISOString().split('T')[0],
      end: lastDayOfMonth.toISOString().split('T')[0],
      prevStart: firstDayOfPrevMonth.toISOString().split('T')[0],
      prevEnd: lastDayOfPrevMonth.toISOString().split('T')[0],
    },
    viewMode: 'range',
    compareMode: false,
  });




  return (
    <div>
      <DashboardTopBar
        filters={filters}
        onFilterChange={setFilters}
       />
      
      {!filters.compareMode ? (
        <>
        <Single1stLayer/>
        <Single2ndLayer/>
        </>
      ) : (
        (<Comp1stLayer />)
      )}



    </div>
  );
};

export default Dashboard;