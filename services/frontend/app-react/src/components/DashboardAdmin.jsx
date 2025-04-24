import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [hotelServices, setHotelServices] = useState([
    { id: 1, name: 'Room Service', price: '100 USD' },
    { id: 2, name: 'Spa Service', price: '50 USD' },
    { id: 3, name: 'Pool Access', price: '30 USD' },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('access_token');
      navigate('/login');
    }
  };

  // Fungsi untuk menambah data layanan baru (misalnya membuka form)
  const handleAddService = () => {
    // Ini bisa diarahkan ke form untuk menambah data layanan
    navigate('/admin/service/add'); // Gantilah path sesuai kebutuhan
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>

      {/* Tombol Logout */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      {/* Judul Tabel */}
      <div className="table-header">
        <h3>Hotel Services</h3>
        <button onClick={handleAddService} className="btn-add">
          Add Service
        </button>
      </div>

      {/* Tabel Layanan Hotel */}
      <table className="hotel-service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotelServices.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
