import UtilityCard from '../../Tempates/UtilityCard';
import Box from '../../Tempates/Box';
import TopTurnoverChart from './TopTurnoverChart';

const topTurnoverData = [
  { name: 'Water', turnoverRate: 4.3 },
  { name: 'Gas', turnoverRate: 3.1 },
  { name: 'Cereal', turnoverRate: 2.6 },
  { name: 'Towels', turnoverRate: 2.2 },
  { name: 'Soap', turnoverRate: 1.8 },
];

const colors = ['#6c5ce7', '#00cec9', '#e17055', '#fd79a8', '#0984e3'];

const TopTurnover = () => {
  return (
    <UtilityCard title="Stock Turnover Rate" minWidth="790px">
      <div className="flex flex-col items-center">
        <TopTurnoverChart data={topTurnoverData} colors={colors} />
      </div>
    </UtilityCard>
  );
};

export default TopTurnover;