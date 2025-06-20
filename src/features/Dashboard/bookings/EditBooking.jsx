import GeneralModal from '../../../components/common/GeneralModal';
import { useState, useEffect } from 'react';
import { updateBooking } from '../../../store/actions/bookingsActions';

const EditBooking = ({ isOpen, onClose, booking, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (booking) {
      setFormData({ ...booking });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateBooking(booking._id, formData);
      onSave(updated.data);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  // Don't render the form until formData is set
  if (!formData) return null;

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded">
        <h2 className="text-lg font-bold">Edit Booking</h2>

        <input
          type="number"
          name="numberOfRooms"
          value={formData.numberOfRooms}
          onChange={handleChange}
          placeholder="Number of Rooms"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          placeholder="Amount Paid"
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          placeholder="Checkin Date"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          placeholder="Checkout Date"
          className="w-full border p-2 rounded"
        />

        {/* Add more fields as necessary */}

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </GeneralModal>
  );
};

export default EditBooking;