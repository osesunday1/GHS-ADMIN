import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const formatCompact = (n) => {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000)     return `₦${(n / 1_000).toFixed(0)}k`;
  return `₦${n}`;
};

const ApartmentRevenueChart = ({ data, colors }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const size = 180;
    const radius = size / 2 - 6;
    const innerRadius = radius * 0.58;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', size).attr('height', size);

    const g = svg.append('g').attr('transform', `translate(${size / 2},${size / 2})`);

    const pie = d3.pie().value(d => d.totalRevenue).sort(null).padAngle(0.03);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius).cornerRadius(4);

    const total = d3.sum(data, d => d.totalRevenue);

    g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[i % colors.length])
      .attr('d', arc);

    // Center label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .attr('fill', '#111827')
      .text(formatCompact(total));

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('font-size', '10px')
      .attr('fill', '#9ca3af')
      .text('revenue');
  }, [data, colors]);

  if (!data || data.length === 0) return null;

  const total = data.reduce((s, d) => s + d.totalRevenue, 0);

  return (
    <div className="flex items-center gap-4">
      <svg ref={svgRef} className="flex-shrink-0" />
      <div className="space-y-2.5 min-w-0 flex-1">
        {data.map((d, i) => {
          const pct = total > 0 ? ((d.totalRevenue / total) * 100).toFixed(0) : 0;
          return (
            <div key={d.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 truncate leading-tight">{d.name}</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">
                  ₦{d.totalRevenue.toLocaleString()}
                </p>
              </div>
              <span className="text-xs font-medium text-gray-400 flex-shrink-0">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApartmentRevenueChart;
