import React from "react";
import "./Home.css";
import fruitImg from "../../assets/fruit-plate.png"; // put your image in /client/src/assets/
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    Healthy <br />
                    Fresh <span className="highlight">Fruits!</span>
                </h1>
                <h3>Order Now For Fresh Healthy Life</h3>
                <p>
                    Healthy and yummy food for fresh morning breakfast.
                    Eat Daily for good health and mind.
                </p>
                <button className="order-btn"> <Link to="/products" >🍎 Order Now</Link></button>

            </div>

            <div className="hero-image">
                <img src={fruitImg} alt="Fresh Fruits" />
            </div>
        </section>
    );
};

export default Home;
