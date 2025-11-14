
import React, { useContext, useState } from 'react';
import { itemContext } from '../../context/ItemContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useContext(itemContext);
    const navigate = useNavigate();

    const gstAmount = totalPrice * 0.05;
    const finalTotal = totalPrice + gstAmount;

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePay = async () => {
        if (!formData.name || !formData.contact || !formData.address) {
            alert('Please fill all required fields');
            return;
        }

        const orderData = {
            ...formData,
            items: cart.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            total: finalTotal,
        };

        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                alert('Order Placed Successfully! But cash on delivery');
                clearCart();
                navigate('/');
            } else {
                alert('Failed to place order');
            }
        } catch (err) {
            console.error('Error placing order:', err);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout 🧾</h2>

            <div className="form-section">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="number" name="contact" placeholder="Contact" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" onChange={handleChange} required />
                <input type="number" name="pincode" placeholder="Pincode" onChange={handleChange} required />
            </div>

            <h3>Bill Details</h3>
            {cart.map((item) => (
                <div key={item._id}>
                    {item.name} - {item.quantity} × ₹{item.price} = ₹{item.price * item.quantity}
                </div>
            ))}

            <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
            <p>GST (5%): ₹{gstAmount.toFixed(2)}</p>
            <h3>Total: ₹{finalTotal.toFixed(2)}</h3>

            <button className="buy-button" onClick={handlePay}>Pay & Place Order</button>
        </div>
    );
};

export default Checkout;
