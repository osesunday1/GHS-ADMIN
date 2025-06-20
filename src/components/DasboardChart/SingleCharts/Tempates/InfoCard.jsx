import React from 'react';

const InfoCard = ({ title, amount, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm flex items-center justify-between h-[147px] w-[290px] p-4">
     <div>
        <p className="text-gray-500 text-m">{title}</p>
        <p className="text-3xl font-semibold text-center text-gray-700">{amount}</p>
      </div>
      <div className="w-17 h-17 bg-gray-500 rounded-full flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

export default InfoCard;