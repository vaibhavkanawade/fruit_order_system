
import React, { useContext } from 'react';
import { itemContext } from '../../context/ItemContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cart, addToCart, removeFromCart, totalPrice, itemsInCart } = useContext(itemContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleProceedToBuy = () => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/checkout");
        } else {
            navigate("/login", { state: { from: "/checkout" } });
        }
    };

    const handleGoToProducts = () => {
        navigate("/products");
    };

    if (!cart || cart.length === 0) {
        return <h2 className="empty-cart">Your cart is empty</h2>;
    }

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>

            {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <div className="quantity">
                        <button onClick={() => removeFromCart(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)}>+</button>
                    </div>
                    <p>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                </div>
            ))}

            <hr />

            <p>
                <strong>
                    Subtotal ({itemsInCart} item{itemsInCart > 1 ? 's' : ''}): ₹{totalPrice}
                </strong>
            </p>

            {/*  Proceed to Buy Button */}
            <button onClick={handleProceedToBuy} className="checkout-btn">
                Proceed to Buy
            </button>

            {/*  Go To Products Button */}
            <button onClick={handleGoToProducts} className="go-products-btn">
                Go To Products
            </button>
        </div>
    );
};

export default Cart;
