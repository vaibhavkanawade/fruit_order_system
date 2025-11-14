// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ItemDashboard.css';

// const API_URL = 'http://localhost:5000/api/products';

// const ItemDashboard = () => {
//     const [items, setItems] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const res = await fetch(API_URL);
//             const data = await res.json();
//             setItems(data);
//         } catch (err) {
//             console.error('Error fetching items:', err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this item?')) {
//             const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//             if (res.ok) {
//                 fetchItems();
//             } else {
//                 alert('Delete failed');
//             }
//         }
//     };

//     // 🟡 Pagination calculations
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(items.length / itemsPerPage);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <div className="dashboard-container">
//             <div className="header">
//                 <div>
//                     <h1>Admin Dashboard 👨‍💻</h1>
//                     <h2>Product List</h2>
//                 </div>
//                 <button onClick={() => navigate('/create-item')} className="create-btn">+ Create</button>
//             </div>

//             <table className="item-table">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Name</th>
//                         <th>Category</th>
//                         <th>Price</th>
//                         <th>Image</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.length > 0 ? (
//                         currentItems.map((item, idx) => (
//                             <tr key={item._id}>
//                                 <td>{indexOfFirstItem + idx + 1}</td>
//                                 <td>{item.name}</td>
//                                 <td><span className="badge green">{item.category}</span></td>
//                                 <td>₹{item.price}</td>
//                                 <td>
//                                     {item.image && <img src={item.image} alt={item.name} width="40" />}
//                                 </td>
//                                 <td>
//                                     <button onClick={() => navigate(`/view-item/${item._id}`)} className="view-btn">👁</button>
//                                     <button onClick={() => navigate(`/edit-item/${item._id}`)} className="edit-btn">✏️</button>
//                                     <button onClick={() => handleDelete(item._id)} className="delete-btn">🗑</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6" style={{ textAlign: 'center' }}>No products found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* 🟡 Pagination */}
//             {totalPages > 1 && (
//                 <div className="pagination">
//                     {[...Array(totalPages)].map((_, i) => (
//                         <button
//                             key={i + 1}
//                             onClick={() => handlePageChange(i + 1)}
//                             className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//                         >
//                             {i + 1}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ItemDashboard;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemDashboard.css';

const PRODUCT_API = 'http://localhost:5000/api/products';
const ORDER_API = 'http://localhost:5000/api/orders';

const ItemDashboard = () => {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showOrders, setShowOrders] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch(PRODUCT_API);
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error('Error fetching items:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const res = await fetch(`${PRODUCT_API}/${id}`, { method: 'DELETE' });
            if (res.ok) fetchItems();
            else alert('Delete failed');
        }
    };

    // 📦 Fetch Orders
    const fetchOrders = async () => {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(data);
        setShowOrders(true);
    };


    // ✅ Mark order as Delivered
    const markAsDelivered = async (orderId) => {
        try {
            const res = await fetch(`${ORDER_API}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Delivered' }),
            });

            if (res.ok) {
                setOrders((prev) =>
                    prev.map((o) =>
                        o._id === orderId ? { ...o, status: 'Delivered' } : o
                    )
                );
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            console.error('Error updating order:', err);
        }
    };

    // 🟡 Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-container">
            {/* 🧭 Header */}
            <div className="header">
                <div>
                    <h1>Admin Dashboard 👨‍💻</h1>
                    <h2>Product List</h2>
                </div>
                <div>
                    <button onClick={() => navigate('/create-item')} className="create-btn">+ Create</button>
                    <button onClick={fetchOrders} className="order-btn">📦 View Orders</button>
                </div>
            </div>

            {/*  Product Table */}
            <table className="item-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((item, idx) => (
                            <tr key={item._id}>
                                <td>{indexOfFirstItem + idx + 1}</td>
                                <td>{item.name}</td>
                                <td><span className="badge green">{item.category}</span></td>
                                <td>₹{item.price}</td>
                                <td>{item.image && <img src={item.image} alt={item.name} width="40" />}</td>
                                <td>
                                    <button onClick={() => navigate(`/view-item/${item._id}`)} className="view-btn">👁</button>
                                    <button onClick={() => navigate(`/edit-item/${item._id}`)} className="edit-btn">✏️</button>
                                    <button onClick={() => handleDelete(item._id)} className="delete-btn">🗑</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 🟡 Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* 📦 Orders Modal */}
            {/* 📦 Orders Modal */}
            {showOrders && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>📚 Orders List</h2>
                        <button className="close-btn" onClick={() => setShowOrders(false)}>✖</button>

                        {orders.length > 0 ? (
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Contact</th>
                                        <th>City</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.orderId}</td>
                                            <td>{order.name}</td>
                                            <td>{order.contact}</td>
                                            <td>{order.city}</td>
                                            <td>₹{order.total.toFixed(2)}</td>
                                            <td>
                                                <span className={`status-badge ${order.status === 'Delivered' ? 'delivered' : 'pending'}`}>
                                                    {order.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                {order.status !== 'Delivered' && (
                                                    <button
                                                        className="deliver-btn"
                                                        onClick={() => markAsDelivered(order._id)}
                                                    >
                                                        ✅ Mark Delivered
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No orders found</p>
                        )}

                        {/* ⬅️ Back Button */}
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <button
                                className="back-btn"
                                onClick={() => setShowOrders(false)}
                            >
                                ⬅ Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ItemDashboard;
