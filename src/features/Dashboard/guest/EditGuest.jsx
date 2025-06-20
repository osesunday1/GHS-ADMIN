import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGuest, getGuests } from '../../../store/actions/guestActions';
import GeneralModal from '../../../components/common/GeneralModal';

const EditGuest = ({ guest, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: guest.firstName,
    lastName: guest.lastName,
    email: guest.email,
    phone: guest.phone,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await dispatch(updateGuest(guest._id, data));
      dispatch(getGuests());
      onClose();
    } catch (err) {
      console.error('Update failed:', err.message);
    }
  };

  return (
    <GeneralModal isOpen={true} onClose={onClose} title="Edit Guest Info">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </GeneralModal>
  );
};

export default EditGuest;