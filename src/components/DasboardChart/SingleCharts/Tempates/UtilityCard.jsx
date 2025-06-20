const UtilityCard = ({
  title,
  children,
  maxWidth = '100%',
  headerRight = null,
  minWidth='',
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm "
      style={{ maxWidth, minWidth }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-400 ">

        <h2 className="text-gray-700 font-semibold text-lg my-3 mx-5">{title}</h2>
        {headerRight}
      </div>

      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default UtilityCard;