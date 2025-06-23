import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRevenuePerApartment } from '../../../../../store/actions/dashboard/revenuePerApartmentActions';
import UtilityCard from '../../Tempates/UtilityCard';
import ApartmentRevenueChart from './ApartmentRevenueChart';
import Box from '../../Tempates/Box';

const ApartmentRevenue = ({ filters, getRevenuePerApartment, apartmentRevenueData, loading }) => {
  
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getRevenuePerApartment(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getRevenuePerApartment, filters]);

  const totalRevenue = apartmentRevenueData.reduce((acc, apt) => acc + apt.totalRevenue, 0);

  const chartData = apartmentRevenueData.map((apt) => ({
    name: apt._id,
    revenue: apt.totalRevenue,
    percentage: ((apt.totalRevenue / totalRevenue) * 100).toFixed(1),
  }));

  const colors = ['#4dabf7', '#ff6b6b', '#845ef7', '#20c997', '#fcc419', '#ff922b'];

  return (
    <UtilityCard title="Apartment Revenue" minWidth="395px">
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <ApartmentRevenueChart data={chartData} colors={colors} />
            <div className="mt-4 w-full space-y-3">
              {chartData.map((apt, index) => (
                <div key={apt.name} className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <Box color={colors[index % colors.length]} />
                    <span className="text-gray-700 font-medium">{apt.name}</span>
                  </div>
                  <span className="text-gray-500 font-semibold">
                    ₦{Number(apt.revenue).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  apartmentRevenueData: state.revenuePerApartment.apartmentRevenueData,
  loading: state.revenuePerApartment.loading,
  error: state.revenuePerApartment.error,
});

export default connect(mapStateToProps, { getRevenuePerApartment })(ApartmentRevenue);
