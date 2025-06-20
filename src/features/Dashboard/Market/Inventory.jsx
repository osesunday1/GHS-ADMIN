import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProducts, deleteProduct } from '../../../store/actions/inventoryActions';
import AddInventory from './AddInventory';
import EditInventory from './EditInventory';
import GeneralModal from '../../../components/common/GeneralModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Inventory = ({ products, loading, error, getProducts, deleteProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getProducts();
  }, [getProducts]);


    //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const inventoryPerPage = 10;
  const indexOfLastInventory = currentPage * inventoryPerPage;
  const indexOfFirstInventory = indexOfLastInventory - inventoryPerPage;
  const currentInventory = products.slice(indexOfFirstInventory, indexOfLastInventory);
  const totalPages = Math.ceil(products.length / inventoryPerPage);



  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deleteProduct(selectedProduct._id);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-[1200px] mx-auto h-[90%]">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>


      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (

        <div className="overflow-x-auto h-[80vh] ">
            <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead>
                <tr className="bg-secondary-100 text-secondary text-left">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">SKU</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Market Price</th>
                <th className="py-2 px-4 border-b">Selling Price</th>
                <th className="py-2 px-4 border-b">Reorder Level</th>
                <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentInventory.map((p, index) => (
                <tr key={p._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-primary-100'} hover:bg-gray-100`}>
                    <td className="py-5 px-4">{p.name}</td>
                    <td className="py-5 px-4">{p.sku}</td>
                    <td className="py-5 px-4">{p.quantity}</td>
                    <td className="py-5 px-4">₦{p.marketPrice}</td>
                    <td className="py-5 px-4">₦{p.sellingPrice}</td>
                    <td className="py-5 px-4">{p.reorderLevel}</td>
                    <td className="py-5 px-4 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-green-600"><FaEdit /></button>
                    <button onClick={() => handleDelete(p)} className="text-red-600"><FaTrash /></button>
                    </td>
                </tr>
                ))}
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
         </div>
      )}

      <EditInventory
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        product={selectedProduct}
      />

      <GeneralModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold text-red-600 mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this product?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">Yes, Delete</button>
          </div>
        </div>
      </GeneralModal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.inventory.products,
  loading: state.inventory.loading,
  error: state.inventory.error,
});

export default connect(mapStateToProps, { getProducts, deleteProduct })(Inventory);