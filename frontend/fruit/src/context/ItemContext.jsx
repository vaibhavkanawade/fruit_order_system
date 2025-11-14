// context/ItemContext.js
import { createContext, useEffect, useState } from "react";

const itemContext = createContext();

function CustomItemContext({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    //  Fetch products on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                const products = await response.json();
                setProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    //  Reusable function to update totals
    const updateCartTotals = (updatedCart) => {
        const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setItemsInCart(totalItems);
        setTotalPrice(totalCost);
    };

    //  Add item to cart
    const addToCart = (product) => {
        const existingItemIndex = cart.findIndex((p) => p._id === product._id);
        let updatedCart;

        if (existingItemIndex !== -1) {
            updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        updateCartTotals(updatedCart);
    };

    //  Remove item from cart
    const removeFromCart = (product) => {
        const existingItemIndex = cart.findIndex((p) => p._id === product._id);
        if (existingItemIndex === -1) return;

        const updatedCart = [...cart];
        const existingItem = updatedCart[existingItemIndex];

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            updatedCart.splice(existingItemIndex, 1);
        }

        setCart(updatedCart);
        updateCartTotals(updatedCart);
    };

    //  Clear the entire cart after successful checkout
    const clearCart = () => {
        setCart([]);
        setItemsInCart(0);
        setTotalPrice(0);
    };

    return (
        <itemContext.Provider
            value={{
                products,
                cart,
                addToCart,
                removeFromCart,
                clearCart,   //  Make clearCart available
                itemsInCart,
                totalPrice,
            }}
        >
            {children}
        </itemContext.Provider>
    );
}

export { itemContext };
export default CustomItemContext;
