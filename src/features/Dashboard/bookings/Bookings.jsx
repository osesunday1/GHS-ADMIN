import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBookings } from '../../../store/actions/bookingsActions';
import { deleteBooking } from '../../../store/actions/bookingsActions';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import EditBooking from './EditBooking';
import ViewBooking from './ViewBooking';
import GeneralModal from '../../../components/common/GeneralModal';
import Box from '../../../components/DasboardChart/SingleCharts/Tempates/Box'



const Bookings = ({ bookings, loading, error, getBookings }) => {
  useEffect(() => {
    getBookings();
  }, [getBookings]);


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);


// Inside Bookings component
const [selectedBooking, setSelectedBooking] = useState(null);
const [isEditModalOpen, setEditModalOpen] = useState(false);
const [isViewModalOpen, setViewModalOpen] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleEditClick = (booking) => {
  setSelectedBooking(booking);
  setEditModalOpen(true);
};

const handleSaveBooking = (updatedData) => {
  getBookings();  
  // You may re-fetch bookings or optimistically update state
};


const handleViewClick = (booking) => {
  setSelectedBooking(booking);
  setViewModalOpen(true);
};

// Handle click on trash button
const handleDeleteClick = (booking) => {
  setSelectedBooking(booking);
  setShowDeleteModal(true);
};

// Confirm delete action
const confirmDelete = async () => {
  try {
    await deleteBooking(selectedBooking._id); // your delete action
    setShowDeleteModal(false);
    setSelectedBooking(null);
    getBookings(); // refresh the list
  } catch (err) {
    alert('Failed to delete booking: ' + err.message);
  }
};


//status helper function
const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return { color: '#3498db', label: 'Upcoming' }; // blue
    case 'checked-in':
      return { color: '#2ecc71', label: 'Checked-In' }; // green
    case 'checked-out':
      return { color: '#e74c3c', label: 'Checked-Out' }; // red
    default:
      return { color: '#bdc3c7', label: 'Unknown' }; // grey
  }
};

  return (
    <div className="bg-white p-6 rounded shadow max-w-[1200px] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-secondary">All Bookings</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead>
              <tr className="bg-secondary-100 text-secondary text-left">
                <th className="py-2 px-4 border-b">Guest</th>
                <th className="py-2 px-4 border-b">Apartment</th>
                <th className="py-2 px-4 border-b">Check-In</th>
                <th className="py-2 px-4 border-b">Check-Out</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Days</th>
                <th className="py-2 px-4 border-b">Rooms</th>
                <th className="py-2 px-4 border-b">Amount Paid</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
                {currentBookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-primary-100'} hover:bg-gray-100`}
                  >
                    <td className="py-5 px-4">
                      {booking.guest?.firstName} {booking.guest?.lastName}
                    </td>
                    <td className="py-5 px-4 ">{booking.apartmentName}</td>
                    <td className="py-5 px-4 ">
                      {new Date(booking.checkInDate).toLocaleDateString('en-CA', { timeZone: 'UTC' })}
                    </td>
                    <td className="py-5 px-4 ">
                      {new Date(booking.checkOutDate).toLocaleDateString('en-CA', { timeZone: 'UTC' })}
                    </td>
                    <td className="py-5 px-4">
                      {(() => {
                        const status = booking.bookingStatus;
                        let color = '#bdc3c7'; // default gray
                        let label = 'Unknown';

                        if (status === 'upcoming') {
                          color = '#3498db';
                          label = 'upcoming';
                        } else if (status === 'in') {
                          color = '#2ecc71';
                          label = 'in';
                        } else if (status === 'out') {
                          color = '#e74c3c';
                          label = 'out';
                        }

                        return <Box color={color} text={label} />;
                      })()}
                    </td>
                    <td className="py-5 px-4 text-center">{booking.numberOfDays}</td>
                    <td className="py-5 px-4 text-center">{booking.numberOfRooms}</td>
                    <td className="py-5 px-4 ">₦{booking.amountPaid.toLocaleString()}</td>
                    <td className="py-5 px-4 ">
                      ₦{booking.totalAmount?.toLocaleString() || '—'}
                    </td>
                    <td className="py-5 px-4 gap-5">
                      <button className="text-blue-600 hover:text-blue-800 mx-2 cursor-pointer"
                       onClick={() => handleViewClick(booking)}   
                      >
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800 mx-2 cursor-pointer"
                              onClick={() => handleEditClick(booking)}
                      >
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800 mx-2 cursor-pointer"
                        onClick={() => handleDeleteClick(booking)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination */}

          {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2 ">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 rounded cursor-pointer ${
                        currentPage === index + 1
                          ? 'bg-secondary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
              {/* MODAL COMPONENT PLACED INSIDE RETURN */}
              <EditBooking
                  isOpen={isEditModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  booking={selectedBooking}
                  onSave={handleSaveBooking}
                />
                {/* modal to view booking */}
                <ViewBooking
                  isOpen={isViewModalOpen}
                  onClose={() => setViewModalOpen(false)}
                  booking={selectedBooking}
                />

                {/* delete modal */}
                <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-red-600 mb-4">Confirm Delete</h2>
                    <p>Are you sure you want to delete this booking?</p>

                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </GeneralModal>

        </div>
      )}
    </div>
  );
};


const mapStateToProps = (state) => ({
  bookings: state.bookings.bookings,
  loading: state.bookings.loading,
  error: state.bookings.error,
});

export default connect(mapStateToProps, { getBookings })(Bookings);