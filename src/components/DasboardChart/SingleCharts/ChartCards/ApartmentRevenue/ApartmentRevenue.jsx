import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRevenuePerApartment } from '../../../../../store/actions/dashboard/revenuePerApartmentActions';
import UtilityCard from '../../Tempates/UtilityCard';
import ApartmentRevenueChart from './ApartmentRevenueChart';
import { FaChartBar } from 'react-icons/fa';

const colors = ['#4dabf7', '#845ef7', '#ff6b6b', '#20c997', '#ffc107'];

const ApartmentRevenue = ({ filters, getRevenuePerApartment, apartmentRevenueData, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getRevenuePerApartment(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getRevenuePerApartment, filters]);

  const chartData = apartmentRevenueData.map(a => ({
    name: a._id,
    totalRevenue: a.totalRevenue,
  }));

  return (
    <UtilityCard title="Revenue per Apartment" maxWidth="395px">
      {loading ? (
        <div className="flex items-center gap-2 py-8 justify-center text-gray-400 text-sm">
          <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full" />
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <FaChartBar className="text-4xl mb-3" />
          <p className="text-sm font-medium text-gray-400">No revenue data for this period</p>
          <p className="text-xs text-gray-300 mt-1">Try adjusting the date range</p>
        </div>
      ) : (
        <ApartmentRevenueChart data={chartData} colors={colors} />
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  apartmentRevenueData: state.revenuePerApartment.apartmentRevenueData,
  loading: state.revenuePerApartment.loading,
  error: state.revenuePerApartment.error,
});

export default connect(mapStateToProps, { getRevenuePerApartment })(ApartmentRevenue);
