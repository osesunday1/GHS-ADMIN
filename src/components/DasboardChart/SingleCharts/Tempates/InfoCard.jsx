const colorMap = {
  blue:   { border: 'border-blue-500',   icon: 'bg-blue-100 text-blue-600' },
  green:  { border: 'border-green-500',  icon: 'bg-green-100 text-green-600' },
  purple: { border: 'border-purple-500', icon: 'bg-purple-100 text-purple-600' },
  orange: { border: 'border-orange-400', icon: 'bg-orange-100 text-orange-500' },
  teal:   { border: 'border-teal-500',   icon: 'bg-teal-100 text-teal-600' },
};

const InfoCard = ({ title, amount, icon, color = 'blue', subtitle }) => {
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${c.border} p-5 flex items-start justify-between`}>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2 leading-tight">{amount}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${c.icon}`}>
        <span className="text-lg">{icon}</span>
      </div>
    </div>
  );
};

export default InfoCard;
