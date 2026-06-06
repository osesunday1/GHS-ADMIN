import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DateRangeControls from './DateRangeControls';
import ToggleButton from './ToggleButton';
import moment from 'moment';

const DashboardTopBar = ({ filters, onFilterChange }) => {

  const handleDateShift = (direction) => {
    const { start, end } = filters.dateRange;
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (filters.viewMode === 'day') {
      const newStart = startMoment.clone().add(direction, 'days');
      const newEnd = newStart.clone();
      const prevStart = newStart.clone().subtract(1, 'days');
      const prevEnd = prevStart.clone();
      onFilterChange({ ...filters, dateRange: { start: newStart.format('YYYY-MM-DD'), end: newEnd.format('YYYY-MM-DD'), prevStart: prevStart.format('YYYY-MM-DD'), prevEnd: prevEnd.format('YYYY-MM-DD') } });
    } else if (filters.viewMode === 'week') {
      const newStart = startMoment.clone().add(direction * 7, 'days');
      const newEnd = endMoment.clone().add(direction * 7, 'days');
      const prevStart = newStart.clone().subtract(7, 'days');
      const prevEnd = newEnd.clone().subtract(7, 'days');
      onFilterChange({ ...filters, dateRange: { start: newStart.format('YYYY-MM-DD'), end: newEnd.format('YYYY-MM-DD'), prevStart: prevStart.format('YYYY-MM-DD'), prevEnd: prevEnd.format('YYYY-MM-DD') } });
    } else {
      const diff = endMoment.diff(startMoment, 'days') + 1;
      const newStart = startMoment.clone().add(direction * diff, 'days');
      const newEnd = endMoment.clone().add(direction * diff, 'days');
      const prevStart = newStart.clone().subtract(diff, 'days');
      const prevEnd = newEnd.clone().subtract(diff, 'days');
      onFilterChange({ ...filters, dateRange: { start: newStart.format('YYYY-MM-DD'), end: newEnd.format('YYYY-MM-DD'), prevStart: prevStart.format('YYYY-MM-DD'), prevEnd: prevEnd.format('YYYY-MM-DD') } });
    }
  };

  const handleViewModeChange = (mode) => {
    const today = moment();
    if (mode === 'day') {
      const start = today.clone();
      const prev = start.clone().subtract(1, 'days');
      onFilterChange({ ...filters, viewMode: 'day', dateRange: { start: start.format('YYYY-MM-DD'), end: start.format('YYYY-MM-DD'), prevStart: prev.format('YYYY-MM-DD'), prevEnd: prev.format('YYYY-MM-DD') } });
    } else if (mode === 'week') {
      const start = today.clone().startOf('week').add(1, 'day');
      const end = today.clone().endOf('week').add(1, 'day');
      const prevStart = start.clone().subtract(7, 'days');
      const prevEnd = end.clone().subtract(7, 'days');
      onFilterChange({ ...filters, viewMode: 'week', dateRange: { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD'), prevStart: prevStart.format('YYYY-MM-DD'), prevEnd: prevEnd.format('YYYY-MM-DD') } });
    } else {
      const start = today.clone().startOf('month');
      const end = today.clone().endOf('month');
      const prevStart = start.clone().subtract(1, 'month').startOf('month');
      const prevEnd = start.clone().subtract(1, 'month').endOf('month');
      onFilterChange({ ...filters, viewMode: 'range', dateRange: { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD'), prevStart: prevStart.format('YYYY-MM-DD'), prevEnd: prevEnd.format('YYYY-MM-DD') } });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm px-5 py-3 flex flex-wrap items-center gap-4 justify-between">
      {/* Date Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleDateShift(-1)}
          className="p-2 rounded-lg bg-secondary-100 text-secondary hover:bg-secondary hover:text-white transition cursor-pointer"
        >
          <FaChevronLeft className="text-xs" />
        </button>

        <DateRangeControls
          startDate={filters.dateRange.start}
          endDate={filters.dateRange.end}
          viewMode={filters.viewMode}
          compareMode={filters.compareMode}
          onDateChange={(start, end, prevStart, prevEnd) =>
            onFilterChange({ ...filters, dateRange: { start, end, prevStart, prevEnd } })
          }
        />

        <button
          onClick={() => handleDateShift(1)}
          className="p-2 rounded-lg bg-secondary-100 text-secondary hover:bg-secondary hover:text-white transition cursor-pointer"
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>

      {/* View Mode Switcher */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {['day', 'week', 'range'].map(v => (
          <button
            key={v}
            onClick={() => handleViewModeChange(v)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition cursor-pointer capitalize ${
              filters.viewMode === v
                ? 'bg-white text-secondary shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Compare Mode */}
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-medium text-gray-600">Compare</span>
        <ToggleButton
          toggled={filters.compareMode}
          onToggle={() => onFilterChange({ ...filters, compareMode: !filters.compareMode })}
        />
      </div>
    </div>
  );
};

export default DashboardTopBar;
