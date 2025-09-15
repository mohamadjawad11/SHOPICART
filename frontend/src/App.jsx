import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProducts from './components/seller/AddProducts';
import ProductList from './components/seller/ProductList';
import Orders from './components/seller/Orders';
import { useAppContext } from './context/AppContext';
import Loading from './components/Loading';
import Contact from './pages/Contact';

const App = () => {
  const { showUserLogin, setShowUserLogin, isSeller } = useAppContext();
  const isSellerPath = useLocation().pathname.includes('seller');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Login modal */}
      {showUserLogin && (
        <div
          onClick={() => setShowUserLogin(false)}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Login />
          </div>
        </div>
      )}

      {/* Navbar */}
      {!isSellerPath && <Navbar />}

      {/* Toast notifications */}
      <Toaster />

      {/* Main content */}
      <main className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} flex-1`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/contact' element={<Contact />} />

          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProducts /> : <SellerLogin />} />
            <Route path='product-list' element={isSeller ? <ProductList /> : <SellerLogin />} />
            <Route path='orders' element={isSeller ? <Orders /> : <SellerLogin />} />
          </Route>
        </Routes>
      </main>

      {/* Footer */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
