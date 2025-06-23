import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLowStockAlerts } from '../../../../../store/actions/dashboard/lowStockActions';
import UtilityCard from '../../Tempates/UtilityCard';
import Box from '../../Tempates/Box';
import LowStockChart from './LowStockChart';

const colors = ['#6c5ce7', '#00cec9', '#e17055', '#fd79a8', '#0984e3'];

const LowStock = ({ getLowStockAlerts, lowStockProducts, loading }) => {
  useEffect(() => {
    getLowStockAlerts();
  }, [getLowStockAlerts]);

  const chartData = lowStockProducts.map(p => ({
    name: p.name,
    turnoverRate: p.quantity // You can rename this if it's misleading
  }));

  return (
    <UtilityCard title="Low Stock" minWidth="790px">
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <LowStockChart data={chartData} colors={colors} />
        )}
      </div>
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  lowStockProducts: state.lowStock.lowStockProducts,
  loading: state.lowStock.loading,
  error: state.lowStock.error,
});

export default connect(mapStateToProps, { getLowStockAlerts })(LowStock);