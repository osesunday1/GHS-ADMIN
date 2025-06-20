import Box from '../../Tempates/Box';
import UtilityCard from '../../Tempates/UtilityCard';
import ApartmentRevenueChart from './ApartmentRevenueChart';

const ApartmentRevenue = () => {
  const revenueData = [
    { name: 'Ivory Pearl', revenue: 32000, percentage: 65 },
    { name: 'Cozy Suites', revenue: 17000, percentage: 35 },
  ];

  const colors = ['#4dabf7', '#ff6b6b'];

  return (
    <UtilityCard title="Apartment Revenue" minWidth="395px" >
      <div className="flex flex-col items-center">
        <ApartmentRevenueChart data={revenueData} colors={colors} />

        <div className="mt-4 w-full space-y-3">
          {revenueData.map((apt, index) => (
            <div key={apt.name} className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Box color={colors[index]} />
                <span className="text-gray-700 font-medium">{apt.name}</span>
              </div>
              <span className="text-gray-500 font-semibold">${apt.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </UtilityCard>
  );
};

export default ApartmentRevenue;