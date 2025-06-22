import UtilityCard from '../../Tempates/UtilityCard';
import Box from '../../Tempates/Box';
import TopExpensesChart from './TopExpensesChart';

const TopExpenses = () => {
  const topExpenseData = [
    { title: 'Internet', amount: 40000, percentage: 30 },
    { title: 'Fuel', amount: 30000, percentage: 22.5 },
    { title: 'Groceries', amount: 25000, percentage: 18.75 },
    { title: 'Maintenance', amount: 20000, percentage: 15 }
  ];

  const colors = ['#6c5ce7', '#00cec9', '#e17055', '#fd79a8'];

  const total = topExpenseData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <UtilityCard title="Total Expenses" maxWidth="395px">
      <div className="flex flex-col items-center">
        <TopExpensesChart data={topExpenseData} colors={colors} total={total} />

        <div className="mt-1 grid grid-cols-2 gap-4 w-full">
          {topExpenseData.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Box color={colors[i]} />
                <span className="text-gray-700 font-medium">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-sm">↑</span>
                <span className="text-gray-500 font-semibold">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UtilityCard>
  );
};

export default TopExpenses;
