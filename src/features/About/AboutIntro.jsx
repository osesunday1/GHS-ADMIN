import img05 from '../../assets/images/home/img05.png';
import { FaHome, FaUserTie, FaMapMarkedAlt } from 'react-icons/fa';

const AboutIntro = () => {
  return (
    <section className="py-20 bg-primary px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Image Group */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            src={img05}
            alt="Living Room"
            className="w-4/5 rounded"
          />
        </div>

        {/* Right Text Content */}
            <div className="w-full md:w-1/2 space-y-6">
            <p className="text-secondary font-medium uppercase">About Us</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Luxury Living<br />The GHS Experience
            </h2>
            <p className="text-gray-600">
                At GHS Apartments, we specialize in providing premium shortlet accommodations that blend comfort, elegance, and convenience. Whether you're in town for business, vacation, or a quick getaway, our spaces are designed to make you feel at home — with all the perks of a luxury stay. From 24/7 electricity and high-speed WiFi to fully equipped kitchens and daily housekeeping, we ensure every moment of your stay is seamless and unforgettable.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4">
                <div className="flex items-start gap-4 bg-secondary-100 p-4 border border-secondary">
                <FaHome className="text-secondary text-xl mt-1" />
                <div>
                    <h4 className="font-semibold text-lg">Tailored For Comfort</h4>
                    <p className="text-gray-600 text-sm">
                    Each apartment is thoughtfully furnished with cozy interiors, spacious lounges, and ensuite bedrooms designed for your relaxation.
                    </p>
                </div>
                </div>

                <div className="flex items-start gap-4 bg-secondary-100 p-4 border border-secondary">
                <FaUserTie className="text-secondary text-xl mt-1" />
                <div>
                    <h4 className="font-semibold text-lg">Personalized Services</h4>
                    <p className="text-gray-600 text-sm">
                    Enjoy chef-on-request, housekeeping, PS5 entertainment, and round-the-clock support to make your stay effortless and enjoyable.
                    </p>
                </div>
                </div>

                <div className="flex items-start gap-4 bg-secondary-100 p-4 border border-secondary">
                <FaMapMarkedAlt className="text-secondary text-xl mt-1" />
                <div>
                    <h4 className="font-semibold text-lg">Strategic Locations</h4>
                    <p className="text-gray-600 text-sm">
                    Our apartments are situated in serene, secure neighborhoods — close to key business hubs and entertainment spots.
                    </p>
                </div>
                </div>
            </div>
            </div>


      </div>
    </section>
  );
};

export default AboutIntro;