import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import GeneralModal from '../../../components/common/GeneralModal';
import logo from '../../../assets/images/logo.png';

const ViewStockHistory = ({ isOpen, onClose, log, name }) => {
  const printRef = useRef();

  if (!isOpen || !log?.logs?.length) return null;

  const logs = log.logs;
  const customerName = logs[0]?.customerName || '—';
  const date = new Date(logs[0]?.date).toLocaleDateString();
  const totalAmount = logs.reduce((sum, item) => sum + (item.total || 0), 0);

  

  if (!isOpen || !log) return null;

  const handleDownloadPDF = async () => {
    const input = printRef.current;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${log.productId?.name || 'Stock'}.pdf`);
  };

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
      <div
        ref={printRef}
        style={{
          background: '#fff',
          padding: '24px',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          width: '100%',
        }}
      >
        {/* Header / Logo */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" style={{ width: '50px', objectFit: 'contain' }} />
        </div>

        <h2 style={{ textAlign: 'center', fontSize: '17px', marginBottom: '20px' }}>
          Invoice
        </h2>

        {/* Invoice Info */}
        <div style={{ marginBottom: '20px', fontSize: '11px' }}>
          <p>Guest Name:<strong>{customerName || '—'}</strong> </p>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
        </div>

        {/* Product Info Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', fontSize: '10px' }}>
              <th style={{ border: '1px solid #17505e', padding: '8px' }}>Product</th>
              <th style={{ border: '1px solid #17505e', padding: '3px' }}>SKU</th>
              <th style={{ border: '1px solid #17505e', padding: '8px' }}>Qty</th>
              <th style={{ border: '1px solid #17505e', padding: '8px' }}>Unit Price (₦)</th>
              <th style={{ border: '1px solid #17505e', padding: '8px' }}>Total (₦)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((item, index) => (
              <tr key={index} style={{ fontSize: '9px' }}>
                <td style={{ border: '1px solid #17505e', padding: '8px' }}>{item.productId?.name || '—'}</td>
                <td style={{ border: '1px solid #17505e', padding: '8px' }}>{item.productId?.sku || '—'}</td>
                <td style={{ border: '1px solid #17505e', padding: '8px' }}>{item.quantityChanged}</td>
                <td style={{ border: '1px solid #17505e', padding: '8px' }}>{item.unitPrice?.toLocaleString() || '—'}</td>
                <td style={{ border: '1px solid #17505e', padding: '8px' }}>{item.total?.toLocaleString() || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '12px' }}>
          <strong>Total Amount: ₦{totalAmount.toLocaleString()}</strong>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '40px', fontSize: '12px', textAlign: 'center', color: '#000' }}>
          Account Number: <strong>1852987806</strong> 
        </div>
        <div style={{  fontSize: '12px', textAlign: 'center', color: '#000' }}>
          AccessBank - <strong>Grace House Service Apartment Ltd</strong>
        </div>
      </div>

      {/* Buttons */}
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

export default ViewStockHistory;