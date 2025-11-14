// import React, { useContext } from "react";
// import { itemContext } from "../../context/ItemContext";
// import { Link } from "react-router-dom";
// // import "./ProductItem.css"; // optional if you have styles

// const ProductItem = ({ product }) => {
//     const { addToCart, removeFromCart, cart } = useContext(itemContext);

//     const existingItem = cart.find((p) => p._id === product._id);
//     const quantity = existingItem ? existingItem.quantity : 0;

//     const handleAddToCart = () => {
//         addToCart(product);
//     };

//     const handleRemoveFromCart = () => {
//         removeFromCart(product);
//     };

//     return (
//         <div className="product-card">
//             <img className="product-image" src={product.image} alt={product.name} />

//             <div className="product-details">
//                 <h3>{product.name}</h3>
//                 <p>{product.description}</p>
//                 <p>Price: ₹{product.price}</p>

//                 <div className="product-actions">
//                     <button> Quantity
//                         <button onClick={handleAddToCart}>+</button>
//                         <span className="product-quantity">{quantity}</span>
//                         <button onClick={handleRemoveFromCart} disabled={quantity === 0}>
//                             −
//                         </button>
//                     </button>
//                 </div>
//                 <Link to="/cart">
//                     <button>Add to Cart</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default ProductItem;




import React, { useContext } from "react";
import { itemContext } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";
import "./ProductItem.css";
const ProductItem = ({ product }) => {
    const { addToCart, removeFromCart, cart } = useContext(itemContext);
    const navigate = useNavigate();

    const existingItem = cart.find((p) => p._id === product._id);
    const quantity = existingItem ? existingItem.quantity : 0;

    // Increase quantity by 1
    const handleIncrease = () => {
        addToCart({ ...product, quantity: 1 });
    };

    // Decrease quantity by 1, remove if 0
    const handleDecrease = () => {
        if (quantity === 1) {
            removeFromCart(product._id);
        } else if (quantity > 1) {
            addToCart({ ...product, quantity: -1 });
        }
    };

    // Add to Cart Button logic:
    // - If quantity = 0 → add quantity 1 first, then go to cart
    // - If quantity > 0 → go directly to cart
    const handleAddToCart = () => {
        if (quantity === 0) {
            addToCart({ ...product, quantity: 1 });
        }
        navigate("/cart"); // open cart page
    };

    return (
        <div className="product-card">
            <img className="product-image" src={product.image} alt={product.name} />

            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>

                {/* Quantity Selector */}
                <div className="product-actions">
                    <button onClick={handleIncrease}>+</button>
                    <span className="product-quantity">{quantity}</span>
                    <button onClick={handleDecrease} disabled={quantity === 0}>−</button>
                </div>

                {/* Add to Cart Button */}
                <button onClick={handleAddToCart}>
                    {quantity > 0 ? "Go to Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductItem;

