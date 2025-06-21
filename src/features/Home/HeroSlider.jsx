import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBed, FaCity, FaCouch, FaKey } from 'react-icons/fa';
import img01 from '../../assets/images/home/01.JPG';
import img02 from '../../assets/images/home/02.JPG';
import img03 from '../../assets/images/home/03.JPG';
import img04 from '../../assets/images/home/04.JPG';
import Modal from '../../components/common/Modal';

const slides = [
  {
    image: img01,
    icon: <FaBed />,
    subtitle: 'GHS Apartments – Ivory Pearl',
    title: 'Experience First-Class Comfort',
    description: 'Enjoy luxury shortlet living with 24/7 electricity, fast WiFi, and premium entertainment – all in a serene, secure environment.',
    buttonText: 'Book Your Stay',
    url: 'https://www.youtube.com/shorts/Thn8DG_Jmj8',
  },
  {
    image: img02,
    icon: <FaCouch />,
    subtitle: 'Perfect for Work or Play',
    title: 'Your Ideal Home Away from Home',
    description: 'Whether for vacation or business, our stylish ensuite rooms, PS5, and daily housekeeping guarantee an unforgettable stay.',
    buttonText: 'Reserve Now',
     url: 'https://www.youtube.com/shorts/Thn8DG_Jmj8',
  },
  {
    image: img03,
    icon: <FaCity />,
    subtitle: 'Cozy Suites by GHS Apartments',
    title: 'Stay Cozy, Stay Connected',
    description: 'Enjoy warmth, comfort, and convenience. Our shortlet apartments offer everything you need for a relaxing visit.',
    buttonText: 'See Amenities',
    url: 'https://www.youtube.com/shorts/Thn8DG_Jmj8',
  },
  {
    image: img04,
    icon: <FaKey />,
    subtitle: 'Live the GHS Lifestyle',
    title: 'Luxury That Feels Like Home',
    description: 'From fully equipped kitchens to chef-on-request services, GHS Apartments redefines what it means to feel at home.',
    buttonText: 'Explore Apartments',
    url: 'https://www.youtube.com/shorts/Thn8DG_Jmj8'
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-primary-100 relative overflow-hidden">
      {/* Left Panel */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-16 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{  y: 40 }}
            animate={{  y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="space-y-6"
          >
            <p className="text-m font-semibold text-secondary flex items-center gap-2">
            <span className="text-xl">{slide.icon}</span>
            {slide.subtitle}
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              {slide.title.split(' ').map((word, idx) => (
                <span key={idx} className={word.toLowerCase() === 'luxury' ? 'text-secondary' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-gray-600 max-w-md">{slide.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="bg-secondary text-white px-6 py-3 rounded shadow hover:bg-secondary-100 transition-all">
                {slide.buttonText}
              </a>
              <button
                className="w-12 h-12 bg-white text-secondary hover:bg-secondary hover:text-white rounded-full shadow-lg flex items-center justify-center text-xl cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                >
                ▶
                </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 h-screen max-h-screen relative flex items-center justify-center align-center bg-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slide.image}
            alt="Slide"
            initial={{ x: 40 }}
            animate={{  x: 0 }}
            exit={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="object-cover w-full h-full max-h-full absolute top-0 left-0"
          />
        </AnimatePresence>

        {/* Thumbnails Overlay */}
        <div className="absolute bottom-26 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 px-4 py-2 rounded-md z-10 opacity-70">
            {slides.map((s, index) => (
                <img
                key={index}
                src={s.image}
                alt={`Thumb ${index}`}
                className={`h-20 w-28 object-cover cursor-pointer rounded border-2 transition-all ${
                    index === current ? 'border-secondary' : 'border-primary'
                }`}
                onClick={() => setCurrent(index)}
                />
            ))}
            </div>
      </div>

      <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            url={slides[current].url}
            />
    </section>
  );
};

export default HeroSlider;