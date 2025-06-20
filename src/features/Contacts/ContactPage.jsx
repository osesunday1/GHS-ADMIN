import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaPen, FaChevronDown } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <section className="bg-primary-100 py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {/* Email */}
          <div className="bg-white shadow p-6 rounded">
            <FaEnvelope className="text-secondary text-3xl mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Email Address</h4>
            <p className="text-gray-600 text-sm">info@ghsapartments.com</p>
            <p className="text-gray-600 text-sm">support@ghsapartments.com</p>
          </div>

          {/* Phone */}
          <div className="bg-white shadow p-6 rounded">
            <FaPhoneAlt className="text-secondary text-3xl mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Phone Number</h4>
            <p className="text-gray-600 text-sm">+234 901-234-5678</p>
            <p className="text-gray-600 text-sm">+234 803-987-6543</p>
          </div>

          {/* Address */}
          <div className="bg-white shadow p-6 rounded">
            <FaMapMarkerAlt className="text-secondary text-3xl mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Office Address</h4>
            <p className="text-gray-600 text-sm">GHS Apartments, Lekki Phase 1</p>
            <p className="text-gray-600 text-sm">Lagos, Nigeria</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow p-8 rounded">
          <h3 className="text-xl font-semibold text-secondary mb-6">Get A Quote</h3>
          <form className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <input type="text" placeholder="Enter your name" className="w-full border p-3 rounded pl-10" />
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
            </div>
            <div className="relative">
              <input type="email" placeholder="Enter email address" className="w-full border p-3 rounded pl-10" />
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            </div>
            <div className="relative">
              <select className="w-full border p-3 rounded appearance-none pr-10">
                <option>Select Service Type</option>
                <option>Apartment Booking</option>
                <option>Airport Pickup</option>
                <option>Chef On Request</option>
              </select>
              <FaChevronDown className="absolute top-4 right-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <input type="tel" placeholder="Enter phone number" className="w-full border p-3 rounded pl-10" />
              <FaPhoneAlt className="absolute top-3.5 left-3 text-gray-400" />
            </div>
            <div className="md:col-span-2 relative">
              <textarea placeholder="Enter message" rows="5" className="w-full border p-3 rounded pl-10 pt-3"></textarea>
              <FaPen className="absolute top-3 left-3 text-gray-400" />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="save" />
              <label htmlFor="save" className="text-sm text-gray-600">Save my info for next time.</label>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="bg-secondary hover:bg-secondary-100 text-white px-6 py-3 rounded font-semibold transition-all">
                GET A FREE SERVICE
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;