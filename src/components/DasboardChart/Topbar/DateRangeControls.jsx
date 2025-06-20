import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateRangeControls = ({ startDate, endDate, onDateChange, viewMode = 'day' }) => {
  const [singleDate, setSingleDate] = useState(startDate ? new Date(startDate) : null);
  const [range, setRange] = useState([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);
  const [weekAnchor, setWeekAnchor] = useState(startDate ? new Date(startDate) : null);


  useEffect(() => {
        if (viewMode === 'day') {
            setSingleDate(startDate ? new Date(startDate) : null);
        } else if (viewMode === 'week') {
            setWeekAnchor(startDate ? new Date(startDate) : null);
        } else if (viewMode === 'range') {
            setRange([
            startDate ? new Date(startDate) : null,
            endDate ? new Date(endDate) : null,
            ]);
        }
    }, [startDate, endDate, viewMode]);



  const handleDayChange = (date) => {
    const current = moment(date).format('YYYY-MM-DD');
    const previous = moment(date).subtract(1, 'day').format('YYYY-MM-DD');
    onDateChange(current, current, previous, previous);
  };

  const handleWeekChange = (date) => {
    const startOfWeek = moment(date).startOf('week').add(1, 'day');
    const endOfWeek = moment(date).endOf('week').add(1, 'day');

    const currentStart = startOfWeek.format('YYYY-MM-DD');
    const currentEnd = endOfWeek.format('YYYY-MM-DD');
    const prevStart = startOfWeek.clone().subtract(7, 'days').format('YYYY-MM-DD');
    const prevEnd = endOfWeek.clone().subtract(7, 'days').format('YYYY-MM-DD');

    onDateChange(currentStart, currentEnd, prevStart, prevEnd);
  };

  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    setRange(dates);

    if (start && end) {
      const s = moment(start);
      const e = moment(end);
      const diff = e.diff(s, 'days') + 1;

      const prevStart = s.clone().subtract(diff, 'days').format('YYYY-MM-DD');
      const prevEnd = e.clone().subtract(diff, 'days').format('YYYY-MM-DD');

      onDateChange(s.format('YYYY-MM-DD'), e.format('YYYY-MM-DD'), prevStart, prevEnd);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {viewMode === 'day' && (
        <DatePicker
          selected={singleDate}
          onChange={(date) => {
            setSingleDate(date);
            handleDayChange(date);
          }}
          dateFormat="dd-MM-yy"
          className="border px-4 py-2 rounded text-center font-medium text-m w-64"
          placeholderText="Select a day"
        />
      )}

      {viewMode === 'week' && (
        <DatePicker
          selected={weekAnchor}
          onChange={(date) => {
            setWeekAnchor(date);
            handleWeekChange(date);
          }}
          dateFormat="dd-MM-yy"
          className="border px-4 py-2 rounded text-center font-medium text-m w-64"
          placeholderText="Select a week"
        />
      )}

      {viewMode === 'range' && (
        <DatePicker
          selectsRange
          startDate={range[0]}
          endDate={range[1]}
          onChange={handleRangeChange}
          dateFormat="dd-MM-yy"
          className="border px-4 py-2 rounded text-center font-medium text-m w-64"
          placeholderText="Select date range"
        />
      )}
    </div>
  );
};

export default DateRangeControls;
