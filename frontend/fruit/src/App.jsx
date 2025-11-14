
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductList from './components/product/ProductList';
import Header from './components/navbar/Header';
import './App.css';
import CustomItemContext from './context/ItemContext';
import Home from './components/home/Home';
import About from './components/navbar/About';
import Contact from './components/navbar/Contact';
import Footer from './components/Footer';
import Cart from './components/cart/Cart';
import SignupForm from './components/navbar/SignupForm';
import LoginForm from './components/navbar/LoginForm';
import { AuthProvider } from './context/AuthContext';
import Checkout from './components/cart/Checkout';
import Logout from './components/logout/Logout';
import ItemDashboard from './dashboard/ItemDashboard';
import ItemView from './dashboard/ItemView'; // add this import
import ItemForm from './dashboard/ItemForm';


// Dummy Admin Dashboard
// const Dashboard = () => (
//   <div style={{ textAlign: "center", marginTop: "50px" }}>
//     <h1>🧑‍💼 Admin Dashboard</h1>
//     <p>Welcome Admin, manage the system here.</p>
//   </div>
// );

// Combined Customer Homepage
const CustomerHomePage = () => (
  <>
    <Home />
    <About id="about" />
    <Contact id="contact" />
  </>
);

const App = () => {
  return (
    <>

      <AuthProvider>
        <CustomItemContext> {/* ✅ Wrap cart context inside AuthProvider */}
          <Router>
            <Header />

            <Routes>
              {/* Authentication */}
              <Route path="/" element={<CustomerHomePage />} />

              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />


              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />

              {/* Role-based pages */}
              <Route path="/dashboard" element={<ItemDashboard />} />
              <Route path="/create-item" element={<ItemForm />} />
              <Route path="/edit-item/:id" element={<ItemForm />} />
              <Route path="/view-item/:id" element={<ItemView />} />

              <Route path='/logout' element={<Logout />} />


            </Routes>

            <Footer />
          </Router>
        </CustomItemContext>
      </AuthProvider>
    </>
  );
};

export default App;
