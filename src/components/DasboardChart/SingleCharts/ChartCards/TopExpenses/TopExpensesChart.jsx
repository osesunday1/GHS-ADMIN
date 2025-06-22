import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TopExpensesChart = ({ data, colors }) => {
  const svgRef = useRef();
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const width = 350;
    const height = 170;
    const innerRadius = 110;
    const outerRadius = 150;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height + 10)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height})`);

    const pie = d3
      .pie()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .value(d => d.amount)
      .sort(null)
      .padAngle(0.03);

    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(5);

    const dataReady = pie(data);

    g.selectAll('path')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i])
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        setHoveredItem(d.data.title);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', function () {
            const [x, y] = arc.centroid(d);
            return `translate(${x * 0.1}, ${y * 0.1})`;
          });
      })
      .on('mouseout', function () {
        setHoveredItem(null);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('transform', 'translate(0,0)');
      });

    // Center label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-2.5em')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text(hoveredItem || 'Total Spent');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.7em')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text(data.reduce((sum, d) => sum + d.amount, 0).toLocaleString());

  }, [data, colors, hoveredItem]);

   return (
<div style={{ borderRadius: '12px', marginTop: '-20px' }}>
 <svg ref={svgRef} />
  </div>)
};

export default TopExpensesChart;