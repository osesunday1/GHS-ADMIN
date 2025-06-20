import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBooking } from '../../../store/actions/bookingsActions';
import { connect } from 'react-redux';
import { getApartments } from '../../../store/actions/apartmentActions';
import { useEffect } from 'react';

const AddBooking = ({ apartments, getApartments }) => {
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    checkInDate: '',
    checkOutDate: '',
    apartmentId: '',
    numberOfRooms: '',
    price: '',
    amountPaid: '',
    cautionFee: '',
  });

  useEffect(() => {
    getApartments();
  }, [getApartments]);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (photo) {
        data.append('photo', photo); // Attach file
      }

      await addBooking(data); // Update addBooking to accept FormData
      navigate('/admin/bookings');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-6 text-secondary">Add New Booking</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Guest Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name" className="p-2 border rounded" value={formData.firstName} onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" className="p-2 border rounded" value={formData.lastName} onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" className="p-2 border rounded col-span-2" value={formData.email} onChange={handleChange}  />
          <input name="phone" placeholder="Phone" className="p-2 border rounded col-span-2" value={formData.phone} onChange={handleChange}  />
          <input name="address" placeholder="Address" className="p-2 border rounded col-span-2" value={formData.address} onChange={handleChange}  />
        </div>

        {/* Booking Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="checkInDate" type="date" className="p-2 border rounded" value={formData.checkInDate} onChange={handleChange} required />
          <input name="checkOutDate" type="date" className="p-2 border rounded" value={formData.checkOutDate} onChange={handleChange} required />
          
          <select
                name="apartmentId"
                className="p-2 border rounded col-span-2"
                value={formData.apartmentId}
                onChange={handleChange}
                required
            >
                <option value="">Select Apartment</option>
                {loading ? (
                <option disabled>Loading...</option>
                ) : (
                apartments.map((apt) => (
                    <option key={apt._id} value={apt._id}>
                    {apt.name} ({apt.type})
                    </option>
                ))
                )}
          </select>
          
          <input name="numberOfRooms" type="number" placeholder="Rooms" className="p-2 border rounded" value={formData.numberOfRooms} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price per day" className="p-2 border rounded" value={formData.price} onChange={handleChange} required />
          <input name="amountPaid" type="number" placeholder="Amount Paid" className="p-2 border rounded" value={formData.amountPaid} onChange={handleChange} required />
          <input name="cautionFee" type="number" placeholder="Caution Fee" className="p-2 border rounded" value={formData.cautionFee} onChange={handleChange} />
        
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="p-2 border rounded col-span-2"
          />
                  
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark cursor-pointer">
          {loading ? 'Creating...' : 'Create Booking'}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  apartments: state.apartments.apartments,
  loading: state.apartments.loading,
});


export default connect(mapStateToProps, { getApartments })(AddBooking);