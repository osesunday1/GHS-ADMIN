import { useState } from 'react';
import { FaPlug, FaGamepad, FaBroom, FaCarSide, FaHeadset, FaChild } from 'react-icons/fa';

const data = [
  {
    title: '24-Hour Electricity',
    icon: <FaPlug />, // You can replace with any appropriate icon
    content:
      'Never worry about power outages. GHS Apartments provides uninterrupted 24-hour electricity, ensuring that your comfort, work, and relaxation continue smoothly, day or night. Whether you’re watching TV, working remotely, or using appliances, you can count on reliable power always.',
  },
  {
    title: 'Premium Entertainment & Games',
    icon: <FaGamepad />,
    content:
      'From a large smart TV and access to Netflix, DSTV, and Prime Video to an immersive PlayStation 5 gaming setup with FIFA, Mortal Kombat, and more — your stay comes fully loaded with world-class entertainment options for all ages and preferences.',
  },
  {
    title: 'Daily Housekeeping',
    icon: <FaBroom />,
    content:
      'We value cleanliness and peace of mind. Our dedicated housekeeping team ensures that your apartment is freshened up daily — including clean linens, disinfected surfaces, and tidy living spaces — so you can focus on enjoying your stay, stress-free.',
  },
  {
    title: 'Airport Pickup & Drop-off',
    icon: <FaCarSide />,
    content:
      'Arriving or departing? Let us handle the logistics. We offer reliable airport pickup and drop-off services for our guests, ensuring a smooth, safe, and punctual transfer to and from the apartment — no ride-hailing hassle required.',
  },
  {
    title: '24/7 Customer Service',
    icon: <FaHeadset />,
    content:
      'Our friendly and professional customer support team is available around the clock to attend to your needs. Whether it’s a service request, assistance with appliances, or local recommendations — we’re just a call or message away, any time of the day.',
  },
];

const NearbyAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-primary-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white border-b border-gray-200 cursor-pointer">
            <div
              className="flex items-center justify-between p-4 hover:bg-secondary-100 transition"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary text-white p-3 rounded">{item.icon}</div>
                <h4 className="font-semibold text-base md:text-lg">{item.title}</h4>
              </div>
              <span className="text-2xl font-bold text-gray-700">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="p-4 pt-0 text-m text-gray-600">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyAccordion;