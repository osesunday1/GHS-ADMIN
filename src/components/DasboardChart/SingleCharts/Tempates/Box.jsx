const Box = ({
  width = '16px',
  height = '16px',
  borderRadius = '4px',
  color = '#000',     // used as background color for box
  fontSize = '14px',
  text = '',
  textColor = '#fff', // optional text color for contrast
}) => {
  // If there's text, render it inside a styled box
  if (text) {
    return (
      <div
        style={{
          backgroundColor: color,
          color: textColor,
          padding: '4px 8px',
          borderRadius,
          fontSize,
          display: 'inline-block',
          textAlign: 'center',
          minWidth: width,
          minHeight: height,
          lineHeight: height,
        }}
      >
        {text}
      </div>
    );
  }

  // Otherwise, render just the small color box
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