import React from "react";

const ItemViewModal = ({ item, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
                <p>Tag: {item.tag}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                {item.image && <img src={item.image} alt={item.name} width="100" />}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ItemViewModal;
