const Box = ({ width = '16px', height = '16px', borderRadius = '4px', color = '#000' }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: color,
        display: 'inline-block',
      }}
    />
  );
};

export default Box;
