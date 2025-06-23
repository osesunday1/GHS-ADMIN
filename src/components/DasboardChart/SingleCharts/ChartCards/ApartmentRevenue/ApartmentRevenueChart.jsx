import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ApartmentRevenueChart = ({ data, colors }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // clear svg

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value(d => d.percentage).sort(null);
    const dataReady = pie(data);

    const arc = d3.arc().innerRadius(60).outerRadius(radius);

    // Animated paths
    const arcs = g.selectAll('path')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .transition()
      .duration(800)
      .attrTween('d', function (d) {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });

    // Add percentage text
    g.selectAll('text')
      .data(dataReady)
      .enter()
      .append('text')
      .text(d => `${d.data.percentage}%`)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .style('font-size', '12px')
      .style('font-weight', 'bold');

  }, [data, colors]);

  return <svg ref={svgRef} />;
};

export default ApartmentRevenueChart;