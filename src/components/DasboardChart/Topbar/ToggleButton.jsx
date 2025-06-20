const ToggleButton = ({ toggled, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${
        toggled ? 'bg-secondary' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          toggled ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;