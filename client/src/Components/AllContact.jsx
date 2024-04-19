import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ContactListComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-Contact?page=${page}`);
      setContacts(response.data.tasks);
      setTotalPages(Math.ceil(response.data.totalTasks)); // Assuming 10 contacts per page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpdate = (id) => {
    console.log('Updating contact with ID:', id);
    window.location.href = `/update/${id}`;
  };

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-contact/${contactId}`);
      fetchData(currentPage);
      toast.success('Contact deleted successfully.');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-0 pt-10 pb-5">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Picture</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="hover:bg-gray-100 text-center">
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.phone}</td>
              <td className="border px-4 py-2">{contact.address}</td>
              <td className="border px-4 py-2">
                <img src={`http://localhost:5000/${contact.picture}`} alt={contact.name} className="h-16 w-16 object-cover rounded-full" />
              </td>
              <td className="border px-4 py-2 flex justify-center gap-4">
                <button onClick={() => handleUpdate(contact._id)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(contact._id)} className="text-red-600 hover:text-red-900 focus:outline-none">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`mx-1 px-3 py-1 rounded-full focus:outline-none ${currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-gray-300 text-gray-900 hover:bg-gray-400 hover:text-gray-900'}`}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`mx-1 px-3 py-1 rounded-full focus:outline-none ${currentPage === page + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`mx-1 px-3 py-1 rounded-full focus:outline-none ${currentPage === totalPages ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-gray-300 text-gray-900 hover:bg-gray-400 hover:text-gray-900'}`}
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactListComponent;
