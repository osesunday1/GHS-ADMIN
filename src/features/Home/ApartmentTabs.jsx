import { useState } from 'react';
import img01 from '../../assets/images/home/01.JPG';
import img02 from '../../assets/images/home/02.JPG';




const apartments = [
  {
    name: 'Cozy Suite',
    description: `Nestled in a quiet and secure environment, the Cozy Suite offers the perfect blend of comfort and functionality. 
    Whether you're traveling for business or leisure, you'll feel right at home in this tastefully designed space. Featuring a spacious ensuite bedroom, 
    a fully equipped kitchen, high-speed Wi-Fi, and 24/7 electricity, this suite ensures that your stay is both productive and relaxing. It's perfect for 
    solo travelers, couples, or anyone seeking tranquility with a touch of elegance.`,
     details: {
      'Total Area': '1200 Sq. Ft',
      Bedroom: '1 Ensuite',
      Bathroom: '1',
      Kitchen: 'Fully Equipped',
      Pets: 'Allowed',
    },
    image: img01,
    video: 'https://www.youtube.com/shorts/Thn8DG_Jmj8',
  },
  {
    name: 'Ivory Pearl',
    description: `Ivory Pearl redefines luxury living. This elegant two-bedroom apartment 
      is ideal for those who crave excellence and sophistication. Each room is meticulously 
      designed with premium furnishings, ambient lighting, and an aesthetic that soothes the 
      soul. It includes a spacious lounge perfect for entertaining guests or relaxing, ensuite 
      bathrooms, and a chef-on-request service for personalized culinary experiences. With fast Wi-Fi, daily 
      housekeeping, PS5 entertainment, and uninterrupted power supply, Ivory Pearl is where first-class comfort meets refined style.`,
   details: {
      'Total Area': '1500 Sq. Ft',
      Bedroom: '2 Ensuite',
      Bathroom: '2',
      Lounge: 'Spacious',
      Chef: 'On Request',
    },
    image: img02,
    video: 'https://www.youtube.com/shorts/Thn8DG_Jmj8',
  },
];


const ApartmentTabs = () => {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const apartment = apartments[active];

  return (
    <section className="py-20 px-6 bg-primary">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Units</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-10 ">
        {apartments.map((apt, index) => (
          <button
            key={index}
            onClick={() => {
              setActive(index);
              setShowVideo(false);
            }}
            className={`pb-2 border-b-2 cursor-pointer text-lg font-medium ${
              index === active ? 'border-secondary text-secondary' : 'border-transparent'
            }`}
          >
            {apt.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-10 items-stretch max-w-6xl mx-auto h-auto">
       

        {/* left Image/Video */}
        <div className="md:w-1/2 relative">
          {!showVideo ? (
            <div className="relative group h-130">
              <img
                src={apartment.image}
                alt={apartment.name}
                className="rounded shadow-md object-cover w-full h-full object-cover"
              />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white text-4xl rounded"
              >
                ▶
              </button>
            </div>
          ) : (
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                src={apartment.video.replace('/shorts/', '/embed/')}
                className="w-full h-130 rounded shadow"
                allowFullScreen
                title={apartment.name}
              />
            </div>
          )}
        </div>

         {/* Right Info */}
        <div className="md:w-1/2 space-y-4 bg-secondary-100 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold">{apartment.name}</h3>
          <p className="text-gray-600">{apartment.description}</p>
          <ul className="mt-6 space-y-2 text-gray-800">
            {Object.entries(apartment.details).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b pb-1 text-sm md:text-base">
                <span>{key}</span>
                <span className="font-semibold">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ApartmentTabs;