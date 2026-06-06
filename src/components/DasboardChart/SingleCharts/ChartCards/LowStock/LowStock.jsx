import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLowStockAlerts } from '../../../../../store/actions/dashboard/lowStockActions';
import UtilityCard from '../../Tempates/UtilityCard';

const LowStock = ({ getLowStockAlerts, lowStockProducts, loading }) => {
  useEffect(() => {
    getLowStockAlerts();
  }, [getLowStockAlerts]);

  return (
    <UtilityCard title="Low Stock Alerts" minWidth="390px">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : lowStockProducts.length === 0 ? (
        <p className="text-gray-400 text-sm">All products are sufficiently stocked.</p>
      ) : (
        <div className="overflow-y-auto max-h-64">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b sticky top-0 bg-white">
              <tr>
                <th className="pb-2">Product</th>
                <th className="pb-2 text-right">Qty</th>
                <th className="pb-2 text-right">Reorder At</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {lowStockProducts.map((product, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category}</p>
                  </td>
                  <td className="py-3 text-right font-semibold text-red-500">
                    {product.quantity}
                  </td>
                  <td className="py-3 text-right text-gray-500">
                    {product.reorderLevel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </UtilityCard>
  );
};

const mapStateToProps = (state) => ({
  lowStockProducts: state.lowStock.lowStockProducts,
  loading: state.lowStock.loading,
  error: state.lowStock.error,
});

export default connect(mapStateToProps, { getLowStockAlerts })(LowStock);
