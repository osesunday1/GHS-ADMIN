import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRevenuePerApartment } from '../../../../../store/actions/dashboard/revenuePerApartmentActions';
import UtilityCard from '../../Tempates/UtilityCard';
import ApartmentRevenueChart from './ApartmentRevenueChart';

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
        <p className="text-gray-500">Loading...</p>
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
