import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBooking } from '../../../store/actions/bookingsActions';
import { getApartments } from '../../../store/actions/apartmentActions';
import { getGuests } from '../../../store/actions/guestActions';
import { FaArrowLeft, FaSearch, FaUserCheck, FaUserPlus, FaTimes } from 'react-icons/fa';

const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition";

const Field = ({ label, required, hint, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const emptyBookingFields = {
  checkInDate: '',
  checkOutDate: '',
  apartmentId: '',
  numberOfRooms: '',
  price: '',
  amountPaid: '',
  cautionFee: '',
};

const AddBooking = ({ apartments, guests, getApartments, getGuests }) => {
  const navigate = useNavigate();
  const [guestMode, setGuestMode] = useState('new'); // 'new' | 'returning'

  // New guest fields
  const [guestFields, setGuestFields] = useState({ firstName: '', lastName: '', phone: '' });
  const [photo, setPhoto] = useState(null);

  // Returning guest selection
  const [guestSearch, setGuestSearch] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Shared booking fields
  const [bookingFields, setBookingFields] = useState(emptyBookingFields);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { getApartments(); }, [getApartments]);
  useEffect(() => { getGuests(); }, [getGuests]);

  const filteredGuests = useMemo(() => {
    if (!guestSearch.trim()) return guests;
    const q = guestSearch.toLowerCase();
    return guests.filter(g =>
      `${g.firstName} ${g.lastName}`.toLowerCase().includes(q) ||
      (g.phone || '').includes(q)
    );
  }, [guests, guestSearch]);

  const handleGuestFieldChange = (e) => {
    const { name, value } = e.target;
    setGuestFields(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingFieldChange = (e) => {
    const { name, value } = e.target;
    setBookingFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest);
    setSearchOpen(false);
    setGuestSearch('');
  };

  const clearSelectedGuest = () => {
    setSelectedGuest(null);
    setGuestSearch('');
  };

  const switchMode = (mode) => {
    setGuestMode(mode);
    setSelectedGuest(null);
    setGuestSearch('');
    setGuestFields({ firstName: '', lastName: '', phone: '' });
    setPhoto(null);
    setError('');
  };

  const numberOfDays =
    bookingFields.checkInDate && bookingFields.checkOutDate
      ? Math.ceil(
          (new Date(bookingFields.checkOutDate) - new Date(bookingFields.checkInDate)) /
            (1000 * 60 * 60 * 24)
        )
      : null;

  const totalAmount =
    numberOfDays && bookingFields.price
      ? numberOfDays * Number(bookingFields.price)
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (guestMode === 'returning' && !selectedGuest) {
      setError('Please select a returning guest.');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();

      if (guestMode === 'returning') {
        data.append('guestId', selectedGuest._id);
      } else {
        data.append('firstName', guestFields.firstName);
        data.append('lastName', guestFields.lastName);
        data.append('phone', guestFields.phone);
        if (photo) data.append('photo', photo);
      }

      Object.entries(bookingFields).forEach(([key, value]) => data.append(key, value));

      await addBooking(data);
      navigate('/admin/bookings');
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/bookings" className="text-gray-400 hover:text-gray-600 transition">
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Booking</h1>
          <p className="text-sm text-gray-500">Create a new reservation</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Guest Mode Toggle */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              type="button"
              onClick={() => switchMode('new')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                guestMode === 'new' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUserPlus className="text-xs" /> New Guest
            </button>
            <button
              type="button"
              onClick={() => switchMode('returning')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                guestMode === 'returning' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUserCheck className="text-xs" /> Returning Guest
            </button>
          </div>

          {/* NEW GUEST FIELDS */}
          {guestMode === 'new' && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b pb-2">
                Guest Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input
                    name="firstName"
                    value={guestFields.firstName}
                    onChange={handleGuestFieldChange}
                    placeholder="e.g. John"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    name="lastName"
                    value={guestFields.lastName}
                    onChange={handleGuestFieldChange}
                    placeholder="e.g. Doe"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    name="phone"
                    value={guestFields.phone}
                    onChange={handleGuestFieldChange}
                    placeholder="e.g. 08012345678"
                    className={`${inputClass} col-span-2`}
                  />
                </Field>
                <Field label="Guest Photo">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setPhoto(e.target.files[0])}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* RETURNING GUEST PICKER */}
          {guestMode === 'returning' && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b pb-2">
                Select Guest
              </h2>

              {selectedGuest ? (
                /* Selected guest card */
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    {selectedGuest.photo?.url ? (
                      <img
                        src={selectedGuest.photo.url}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary font-bold text-sm">
                        {selectedGuest.firstName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {selectedGuest.firstName} {selectedGuest.lastName}
                      </p>
                      {selectedGuest.phone && (
                        <p className="text-xs text-gray-500">{selectedGuest.phone}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearSelectedGuest}
                    className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                    title="Change guest"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                /* Search input + dropdown */
                <div className="relative">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                    <input
                      type="text"
                      value={guestSearch}
                      onChange={e => { setGuestSearch(e.target.value); setSearchOpen(true); }}
                      onFocus={() => setSearchOpen(true)}
                      placeholder="Search by name or phone..."
                      className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  {searchOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                      {filteredGuests.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">No guests found</p>
                      ) : (
                        filteredGuests.map(guest => (
                          <button
                            key={guest._id}
                            type="button"
                            onClick={() => handleSelectGuest(guest)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left border-b border-gray-50 last:border-0 cursor-pointer"
                          >
                            {guest.photo?.url ? (
                              <img
                                src={guest.photo.url}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center text-secondary text-xs font-bold flex-shrink-0">
                                {guest.firstName?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {guest.firstName} {guest.lastName}
                              </p>
                              {guest.phone && (
                                <p className="text-xs text-gray-400">{guest.phone}</p>
                              )}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide border-b pb-2">
            Booking Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Check-In Date" required>
              <input
                type="date"
                name="checkInDate"
                value={bookingFields.checkInDate}
                onChange={handleBookingFieldChange}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Check-Out Date" required>
              <input
                type="date"
                name="checkOutDate"
                value={bookingFields.checkOutDate}
                onChange={handleBookingFieldChange}
                min={bookingFields.checkInDate || undefined}
                className={inputClass}
                required
              />
            </Field>

            <Field label="Apartment" required>
              <select
                name="apartmentId"
                value={bookingFields.apartmentId}
                onChange={handleBookingFieldChange}
                className={`${inputClass} col-span-2`}
                required
              >
                <option value="">Select apartment</option>
                {apartments.map(apt => (
                  <option key={apt._id} value={apt._id}>
                    {apt.name} ({apt.type})
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Number of Rooms" required>
              <input
                type="number"
                name="numberOfRooms"
                value={bookingFields.numberOfRooms}
                onChange={handleBookingFieldChange}
                placeholder="1"
                min="1"
                className={inputClass}
                required
              />
            </Field>

            <Field label="Price per Day (₦)" required>
              <input
                type="number"
                name="price"
                value={bookingFields.price}
                onChange={handleBookingFieldChange}
                placeholder="0"
                min="0"
                className={inputClass}
                required
              />
            </Field>

            <Field label="Amount Paid (₦)" required>
              <input
                type="number"
                name="amountPaid"
                value={bookingFields.amountPaid}
                onChange={handleBookingFieldChange}
                placeholder="0"
                min="0"
                className={inputClass}
                required
              />
            </Field>

            <Field label="Caution Fee (₦)">
              <input
                type="number"
                name="cautionFee"
                value={bookingFields.cautionFee}
                onChange={handleBookingFieldChange}
                placeholder="0"
                min="0"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Live summary */}
          {numberOfDays !== null && numberOfDays > 0 && (
            <div className="bg-secondary-100 rounded-xl px-4 py-3 grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-bold text-gray-800">{numberOfDays} night{numberOfDays !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="font-bold text-secondary">₦{totalAmount?.toLocaleString() ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Balance Due</p>
                <p className={`font-bold ${totalAmount - Number(bookingFields.amountPaid) > 0 ? 'text-red-500' : 'text-green-600'}`}>
                  ₦{(totalAmount - Number(bookingFields.amountPaid || 0) + Number(bookingFields.cautionFee || 0)).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link
            to="/admin/bookings"
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-secondary hover:opacity-90 text-white text-sm font-medium transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Creating...' : 'Create Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  apartments: state.apartments.apartments,
  guests: state.guests.guests,
});

export default connect(mapStateToProps, { getApartments, getGuests })(AddBooking);
