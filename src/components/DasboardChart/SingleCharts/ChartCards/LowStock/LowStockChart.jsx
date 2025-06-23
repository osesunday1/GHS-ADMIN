import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LowStockChart = ({ data = [], colors = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const width = 700;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const chart = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.turnoverRate) * 1.1])
      .range([innerHeight, 0]);

    // X Axis
    chart.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('dy', '1.5em')
      .style('font-size', '12px');

    // Y Axis
    chart.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-size', '12px');

    // Bars
    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name))
      .attr('width', x.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('rx', 6)
      .attr('fill', (d, i) => colors[i] || '#69b3a2')
      .transition()
      .duration(1000)
      .attr('y', d => y(d.turnoverRate) - 5)
      .attr('height', d => innerHeight - y(d.turnoverRate));

  }, [data, colors]);

  return <svg ref={svgRef}></svg>;
};

export default LowStockChart;