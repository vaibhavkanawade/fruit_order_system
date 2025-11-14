import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDashboard.css';

const API_URL = 'http://localhost:5000/api/products';

const ItemView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await res.json();
                setItem(data);
            } catch (err) {
                console.error(' Error fetching item:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return <div className="form-container"><p>Loading item details...</p></div>;
    }

    if (!item) {
        return (
            <div className="form-container">
                <p>Item not found.</p>
                <button onClick={() => navigate('/dashboard')} className="create-btn">Back</button>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2>View Item Details</h2>
            <div className="view-details">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Category:</strong> {item.category}</p>

                <p><strong>Price:</strong> {item.price}</p>
                {/* <p><strong>Quantity:</strong> {item.quantity}</p> */}
                {item.image && (
                    <div>
                        <p><strong>Image:</strong></p>
                        <img src={item.image} alt={item.name} width="150" />
                    </div>
                )}
            </div>
            <button onClick={() => navigate('/dashboard')} className="create-btn" style={{ marginTop: '15px' }}>
                Back
            </button>
        </div>
    );
};

export default ItemView;
