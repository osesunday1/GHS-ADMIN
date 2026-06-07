import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const STATUS_COLORS = { upcoming: '#4dabf7', in: '#51cf66', out: '#adb5bd' };
const STATUS_LABELS = { upcoming: 'Upcoming', in: 'Checked In', out: 'Checked Out' };

const BookingStatusChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2 - 8;
    const innerRadius = radius * 0.58;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value(d => d.value).sort(null).padAngle(0.03);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius).cornerRadius(4);

    const total = d3.sum(data, d => d.value);

    g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('fill', d => STATUS_COLORS[d.data.key])
      .attr('d', arc);

    // Center: total
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.15em')
      .attr('font-size', '26px')
      .attr('font-weight', '700')
      .attr('fill', '#111827')
      .text(total);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.3em')
      .attr('font-size', '11px')
      .attr('fill', '#9ca3af')
      .text('total');
  }, [data]);

  return (
    <div className="flex items-center gap-6">
      <svg ref={svgRef} className="flex-shrink-0" />
      <div className="space-y-3">
        {data.map(d => (
          <div key={d.key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: STATUS_COLORS[d.key] }}
            />
            <div>
              <p className="text-xs text-gray-500">{STATUS_LABELS[d.key]}</p>
              <p className="text-lg font-bold text-gray-800 leading-tight">{d.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusChart;
