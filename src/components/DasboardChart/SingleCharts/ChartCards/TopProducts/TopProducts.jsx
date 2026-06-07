import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTopProducts } from '../../../../../store/actions/dashboard/topProductsActions';
import UtilityCard from '../../Tempates/UtilityCard';
import TopProductsChart from './TopProductsChart';
import { FaChartBar } from 'react-icons/fa';

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
        <div className="flex items-center gap-2 py-8 justify-center text-gray-400 text-sm">
          <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full" />
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <FaChartBar className="text-4xl mb-3" />
          <p className="text-sm font-medium text-gray-400">No sales data for this period</p>
          <p className="text-xs text-gray-300 mt-1">Try adjusting the date range</p>
        </div>
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