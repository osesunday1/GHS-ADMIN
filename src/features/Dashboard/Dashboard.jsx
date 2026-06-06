import { useState } from "react";
import DashboardTopBar from "../../components/DasboardChart/Topbar/DashboardTopBar";
import Single1stLayer from "../../components/DasboardChart/SingleCharts/Single1stLayer";
import Single2ndLayer from "../../components/DasboardChart/SingleCharts/Single2ndLayer";
import Single3rdLayer from "../../components/DasboardChart/SingleCharts/Single3rdLayer";
import Comp1stLayer from "../../components/DasboardChart/CompCharts/Comp1stLayer";
import moment from "moment";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const formatPeriod = (start, end, viewMode) => {
  const s = moment(start);
  const e = moment(end);
  if (viewMode === 'day') return s.format('dddd, D MMMM YYYY');
  if (viewMode === 'week') return `${s.format('D MMM')} – ${e.format('D MMM YYYY')}`;
  if (s.isSame(e, 'month')) return s.format('MMMM YYYY');
  return `${s.format('D MMM')} – ${e.format('D MMM YYYY')}`;
};

const Dashboard = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const firstDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);

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

  const period = formatPeriod(filters.dateRange.start, filters.dateRange.end, filters.viewMode);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{getGreeting()}</p>
          <h1 className="text-2xl font-bold text-gray-800 mt-0.5">Dashboard</h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Period</p>
          <p className="text-sm font-semibold text-secondary mt-0.5">{period}</p>
        </div>
      </div>

      {/* Controls */}
      <DashboardTopBar filters={filters} onFilterChange={setFilters} />

      {/* Content */}
      {!filters.compareMode ? (
        <>
          <Single1stLayer filters={filters} />
          <Single2ndLayer filters={filters} />
          <Single3rdLayer filters={filters} />
        </>
      ) : (
        <Comp1stLayer />
      )}
    </div>
  );
};

export default Dashboard;
