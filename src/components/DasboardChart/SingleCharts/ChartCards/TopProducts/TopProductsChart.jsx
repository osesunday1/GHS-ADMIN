import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TopProductsChart = ({ data, colors }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 370;
    const barHeight = 60;
    const height = data.length * barHeight + 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    const margin = { top: 20, right: 60, bottom: 30, left: 100 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([0, chartWidth]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, chartHeight])
      .padding(0.4);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Bars with rounded edges and different colors
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => y(d.name))
      .attr('x', 0)
      .attr('rx', 6) // rounded edges
      .attr('height', y.bandwidth())
      .attr('width', 0)
      .attr('fill', (d, i) => colors[i % colors.length])
      .transition()
      .duration(1000)
      .attr('width', d => x(d.count));

    // Count labels on the right of bars
    g.selectAll('text.count')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'count')
      .text(d => d.count)
      .attr('x', d => x(d.count) + 8)
      .attr('y', d => y(d.name) + y.bandwidth() / 1.6)
      .attr('fill', '#6b7280')
      .attr('font-size', '13px');

    // Y axis labels (product names)
    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('font-size', '14px')
      .attr('fill', '#374151');

  }, [data, colors]);

  return <svg ref={svgRef} />;
};

export default TopProductsChart;