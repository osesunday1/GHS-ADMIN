import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGuests } from '../../../store/actions/guestActions';
import { FaEdit } from 'react-icons/fa';
import EditGuest from './EditGuest';

const Guest = ({ guests, loading, error, getGuests }) => {
  useEffect(() => {
    getGuests();
  }, [getGuests]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const guestPerPage = 12;
  const indexOfLastGuest = currentPage * guestPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestPerPage;
  const currentGuest = guests.slice(indexOfFirstGuest, indexOfLastGuest);
  const totalPages = Math.ceil(guests.length / guestPerPage);

  // Edit state
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);



  return (
    <div className="bg-white p-6 rounded shadow max-w-[1200px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Guests</h2>

      {loading && <p>Loading guests...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && guests.length === 0 && <p>No guests found.</p>}

      {guests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead>
              <tr className="bg-secondary-100 text-secondary text-left">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentGuest.map((guest, idx) => (
                <tr key={guest._id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-primary-100'} hover:bg-gray-100`}>
                  <td className="py-5 px-4">{idx + 1}</td>
                  <td className="py-5 px-4">{guest.firstName} {guest.lastName}</td>
                  <td className="py-5 px-4">{guest.email}</td>
                  <td className="py-5 px-4">{guest.phone}</td>
                  <td className="py-5 px-4 gap-5">
                    <button
                      className="text-green-600 hover:text-green-800 mx-2 cursor-pointer"
                      onClick={() => {
                        setSelectedGuest(guest);
                        setEditModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    currentPage === index + 1 ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          {isEditModalOpen && selectedGuest && (
            <EditGuest
              guest={selectedGuest}
              onClose={() => {
                setEditModalOpen(false);
                setSelectedGuest(null);
              }}
            />
          )}

        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  guests: state.guests.guests,
  loading: state.guests.loading,
  error: state.guests.error,
});

export default connect(mapStateToProps, { getGuests})(Guest);