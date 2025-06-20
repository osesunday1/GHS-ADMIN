import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import logo from '../../../assets/images/logo.png';
import guest from '../../../assets/images/guest.png';
import GeneralModal from '../../../components/common/GeneralModal';

const ViewBooking = ({ booking, isOpen, onClose }) => {
  const printRef = useRef();

  if (!booking || !booking.guest) return null;

  const handleDownloadPDF = async () => {
    const input = printRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Booking_${booking.guest?.firstName}_${booking._id}.pdf`);
  };

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      {/* PDF CONTENT (INLINE STYLES) */}
      <div
        ref={printRef}
        style={{
          padding: '24px',
          backgroundColor: 'white',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={logo}
            alt="Company Logo"
            style={{ width: '120px', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Booking Details
        </h2>

        {/* Guest Info Section */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Image */}
          <div style={{ flexShrink: 0 }}>
            <a href={booking.guest.photo.url || guest} target="_blank" rel="noopener noreferrer">
                <img
                src={booking.guest.photo.url || guest}
                alt="Guest"
                style={{
                    width: '130px',
                    height: '130px',
                    objectFit: 'cover',
                    borderRadius: '9999px',
                    border: '4px solid #ccc',
                    cursor:'pointer'
                }}
                />
            </a>
            <p style={{ maxWidth: '180px' }}>{booking.guest.firstName} {booking.guest.lastName}</p>
          </div>

          {/* Info */}
          <div style={{ flexGrow: 1 }}>
            {booking.guest.email && <p><strong>Email:</strong> {booking.guest.email}</p>}
            <p><strong>Phone:</strong> {booking.guest.phone}</p>
            <p><strong>Unit:</strong> {booking.apartmentName}</p>
            <p><strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            <p><strong>Rooms:</strong> {booking.numberOfRooms}</p>
            <p><strong>Amount Paid:</strong> ₦{booking.amountPaid.toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ₦{booking.totalAmount?.toLocaleString()}</p>
          </div>
        </div>



        {/* Footer Message */}
            <div style={{ marginTop: '200px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
                <p style={{ fontStyle: 'italic', fontSize: '12px', marginBottom: '1px' }}>
                    We are pleased to have you as a guest and will do everything to make your stay comfortable.
                </p>
           
            </div>
      </div>

      {/* BUTTONS (Keep using Tailwind if preferred) */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </GeneralModal>
  );
};

export default ViewBooking;