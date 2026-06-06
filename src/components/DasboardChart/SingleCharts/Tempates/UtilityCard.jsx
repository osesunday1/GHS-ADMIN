const UtilityCard = ({ title, children, headerRight = null }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex-1 min-w-[360px] max-w-[420px]">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h2>
        {headerRight}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default UtilityCard;
