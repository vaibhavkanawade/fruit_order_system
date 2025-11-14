import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ItemForm.css';

const API_URL = 'http://localhost:5000/api/products';

const ItemForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({ name: '', category: '', price: '', image: '' });

    // 🟡 Load data if we're editing
    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/${id}`)
                .then(res => res.json())
                .then(data => setItem(data))
                .catch(err => console.error('Error fetching item:', err));
        }
    }, [id]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            if (res.ok) {
                navigate('/dashboard');
            } else {
                alert('Save failed');
            }
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Edit Item' : 'Create Item'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    label="Name"
                    value={item.name || ''}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    placeholder="Category"
                    label="Category"
                    value={item.category || ''}
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    placeholder="Price"
                    label="Price"
                    type="number"
                    value={item.price || ''}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    label="Image URL"
                    value={item.image || ''}
                    onChange={handleChange}
                />

                {/* ✅ Button text changes dynamically */}
                <button type="submit">
                    {id ? 'Update' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default ItemForm;
