import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTopProducts } from '../../../../../store/actions/dashboard/topProductsActions';
import UtilityCard from '../../Tempates/UtilityCard';
import TopProductsChart from './TopProductsChart';

const colors = ['#4dabf7', '#845ef7', '#ff6b6b', '#20c997', '#ffc107'];

const TopProducts = ({ filters, getTopProducts, topProducts, loading }) => {
  useEffect(() => {
    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      getTopProducts(filters.dateRange.start, filters.dateRange.end);
    }
  }, [getTopProducts, filters]);

  const chartData = topProducts.map(p => ({
    name: p.name,
    count: p.totalQuantitySold
  }));

  return (
    <UtilityCard title="Top Products Sold" maxWidth="395px">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <TopProductsChart data={chartData} colors={colors} />
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  topProducts: state.topProducts.topProducts,
  loading: state.topProducts.loading,
  error: state.topProducts.error,
});

export default connect(mapStateToProps, { getTopProducts })(TopProducts);