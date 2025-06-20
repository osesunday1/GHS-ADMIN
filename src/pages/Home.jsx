import ApartmentTabs from '../features/Home/ApartmentTabs';
import HeroSlider from '../features/Home/HeroSlider';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <ApartmentTabs/>
      {/* Other sections here */}
    </div>
  );
};

export default Home;