import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaUsers, FaCog } from 'react-icons/fa';
import DateRangeControls from './DateRangeControls';
import ToggleButton from './ToggleButton';
import moment from 'moment';

const DashboardTopBar = ({ 
  filters, 
  onFilterChange, 
}) => {
  
console.log('filters: ', filters)

    // Handle previous/next date navigation
  const handleDateShift = (direction) => {
    const { start, end } = filters.dateRange;
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (filters.viewMode === 'day') {
      const newStart = startMoment.clone().add(direction, 'days');
      const newEnd = newStart.clone();
      const prevStart = newStart.clone().subtract(1, 'days');
      const prevEnd = prevStart.clone();

      onFilterChange({
        ...filters,
        dateRange: {
          start: newStart.format('YYYY-MM-DD'),
          end: newEnd.format('YYYY-MM-DD'),
          prevStart: prevStart.format('YYYY-MM-DD'),
          prevEnd: prevEnd.format('YYYY-MM-DD'),
        },
      });
    } else if (filters.viewMode === 'week') {
      const newStart = startMoment.clone().add(direction * 7, 'days');
      const newEnd = endMoment.clone().add(direction * 7, 'days');
      const prevStart = newStart.clone().subtract(7, 'days');
      const prevEnd = newEnd.clone().subtract(7, 'days');

      onFilterChange({
        ...filters,
        dateRange: {
          start: newStart.format('YYYY-MM-DD'),
          end: newEnd.format('YYYY-MM-DD'),
          prevStart: prevStart.format('YYYY-MM-DD'),
          prevEnd: prevEnd.format('YYYY-MM-DD'),
        },
      });
    } else {
      const diff = endMoment.diff(startMoment, 'days') + 1;
      const newStart = startMoment.clone().add(direction * diff, 'days');
      const newEnd = endMoment.clone().add(direction * diff, 'days');
      const prevStart = newStart.clone().subtract(diff, 'days');
      const prevEnd = newEnd.clone().subtract(diff, 'days');

      onFilterChange({
        ...filters,
        dateRange: {
          start: newStart.format('YYYY-MM-DD'),
          end: newEnd.format('YYYY-MM-DD'),
          prevStart: prevStart.format('YYYY-MM-DD'),
          prevEnd: prevEnd.format('YYYY-MM-DD'),
        },
      });
    }
  };

  // Handle switching between Day, Week, and Range modes
  const handleViewModeChange = (mode) => {
    const today = moment();

    if (mode === 'day') {
      const start = today.clone();
      const end = start.clone();
      const prev = start.clone().subtract(1, 'days');

      onFilterChange({
        ...filters,
        viewMode: 'day',
        dateRange: {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD'),
          prevStart: prev.format('YYYY-MM-DD'),
          prevEnd: prev.format('YYYY-MM-DD'),
        },
      });
    } else if (mode === 'week') {
      const start = today.clone().startOf('week').add(1, 'day'); // Monday
      const end = today.clone().endOf('week').add(1, 'day');     // Sunday
      const prevStart = start.clone().subtract(7, 'days');
      const prevEnd = end.clone().subtract(7, 'days');

      onFilterChange({
        ...filters,
        viewMode: 'week',
        dateRange: {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD'),
          prevStart: prevStart.format('YYYY-MM-DD'),
          prevEnd: prevEnd.format('YYYY-MM-DD'),
        },
      });
    } else if (mode === 'range') {
      const start = today.clone().startOf('month');
      const end = today.clone().endOf('month');
      const prevStart = start.clone().subtract(1, 'month').startOf('month');
      const prevEnd = start.clone().subtract(1, 'month').endOf('month');

      onFilterChange({
        ...filters,
        viewMode: 'range',
        dateRange: {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD'),
          prevStart: prevStart.format('YYYY-MM-DD'),
          prevEnd: prevEnd.format('YYYY-MM-DD'),
        },
      });
    }
  };




  return (
    <div className="bg-white px-4 py-2 shadow flex flex-wrap items-center gap-4 justify-between w-[1200px] mx-auto">
      {/* Date Navigation */}
      <div className="flex items-center gap-2">

        <button className="bg-secondary text-white p-2 rounded" onClick={() => handleDateShift(-1)} >
          <FaChevronLeft />
        </button>

          <DateRangeControls
              startDate={filters.dateRange.start}
              endDate={filters.dateRange.end}
              viewMode={filters.viewMode}
              compareMode={filters.compareMode}
              onDateChange={(start, end, prevStart, prevEnd) => {


                onFilterChange({
                  ...filters,
                  dateRange: {
                    start,
                    end,
                    prevStart,
                    prevEnd,
                  },
                });
              }}
            />


        <button className="bg-secondary text-white p-2 rounded" onClick={() => handleDateShift(1)}>
          <FaChevronRight />
        </button>
      </div>

      {/* View mode toggle (Day / Week / Range) */}
      <div className="flex gap-2">
        {['day', 'week', 'range'].map((v) => (
          <button
            key={v}
            onClick={() => handleViewModeChange(v)}
            className={`px-4 py-2 rounded cursor-pointer font-medium ${
              filters.viewMode === v ? 'bg-secondary text-white' : 'bg-secondary-100 text-secondary'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Pods Dropdown (example) */}
      <div className="relative">
        <button className="bg-secondary text-white px-4 py-2 rounded inline-flex items-center gap-2">
          <FaUsers /> UNITS (4)
        </button>
        {/* You can add dropdown logic here */}
      </div>

      {/* Toggle Compare Mode */}
       <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">COMPARE MODE</span>
            <ToggleButton
              toggled={filters.compareMode}
              onToggle={() =>
                onFilterChange({
                  ...filters,
                  compareMode: !filters.compareMode,
                })
              }
            />
        </div>

      {/* Settings */}
      <button className="bg-gray-200 text-gray-600 p-2 rounded">
        <FaCog />
      </button>
    </div>
  );
};

export default DashboardTopBar;