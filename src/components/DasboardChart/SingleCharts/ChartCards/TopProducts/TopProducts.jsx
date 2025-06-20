import UtilityCard from '../../Tempates/UtilityCard';
import TopProductsChart from './TopProductsChart';

const productData = [
  { name: 'Toothpaste', count: 120 },
  { name: 'Shampoo', count: 90 },
  { name: 'Body Soap', count: 75 },
  { name: 'Lotion', count: 60 },
  { name: 'Toilet Paper', count: 40 },
];

const colors = ['#4dabf7', '#845ef7', '#ff6b6b', '#20c997', '#ffc107'];

const TopProducts = () => {
  return (
    <UtilityCard title="Top Products Sold" maxWidth="395px">
      <TopProductsChart data={productData} colors={colors} />
    </UtilityCard>
  );
};

export default TopProducts;