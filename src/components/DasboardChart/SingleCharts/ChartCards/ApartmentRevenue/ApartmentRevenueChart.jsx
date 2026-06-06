import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ApartmentRevenueChart = ({ data, colors }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 370;
    const barHeight = 60;
    const height = data.length * barHeight + 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    const margin = { top: 20, right: 80, bottom: 30, left: 110 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.totalRevenue) || 1])
      .range([0, chartWidth]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, chartHeight])
      .padding(0.4);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => y(d.name))
      .attr('x', 0)
      .attr('rx', 6)
      .attr('height', y.bandwidth())
      .attr('width', 0)
      .attr('fill', (d, i) => colors[i % colors.length])
      .transition()
      .duration(1000)
      .attr('width', d => x(d.totalRevenue));

    g.selectAll('text.value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value')
      .text(d => `₦${d.totalRevenue.toLocaleString()}`)
      .attr('x', d => x(d.totalRevenue) + 6)
      .attr('y', d => y(d.name) + y.bandwidth() / 1.6)
      .attr('fill', '#6b7280')
      .attr('font-size', '11px');

    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('font-size', '13px')
      .attr('fill', '#374151');

  }, [data, colors]);

  return <svg ref={svgRef} />;
};

export default ApartmentRevenueChart;
