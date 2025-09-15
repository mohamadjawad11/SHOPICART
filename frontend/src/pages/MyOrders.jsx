import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const getMyOrders = async () => {
    try {
      if (!user?._id) return;
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 px-4">
      <div className="flex flex-col items-start mb-8">
        <p className="text-2xl font-semibold uppercase tracking-wide">My Orders</p>
        <div className="w-20 h-1 bg-primary rounded-full mt-2"></div>
      </div>

      {myOrders.length === 0 && (
        <p className="text-gray-500">You have no orders yet.</p>
      )}

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-10 p-5 max-w-5xl shadow-sm bg-white"
        >
          {/* Order Info Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-600 text-sm font-medium mb-5 gap-2">
            <span>
              <strong className="text-primary">Order ID:</strong> {order._id}
            </span>
            <span>
              <strong className="text-primary">Payment:</strong> {order.paymentType}
            </span>
            <span>
              <strong className="text-primary">Total:</strong> {currency}{order.ammount || 0}
            </span>
          </div>

          {/* Items List */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-white text-gray-700 ${
                order.items.length !== idx + 1 ? 'border-b' : ''
              } border-gray-200 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 gap-6`}
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <img
                    src={item.product?.image?.[0] || ''}
                    alt={item.product?.name || 'Product'}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.product?.name || 'Unknown Product'}
                  </h2>
                  <p className="text-gray-500 text-sm">{item.product?.category || ''}</p>
                </div>
              </div>

              {/* Status and Details */}
              <div className="text-gray-900 text-sm md:text-base flex flex-col gap-1">
                <p>Quantity: <span className="font-medium">{item.quantity || 1}</span></p>
                <p>Status: <span className="font-medium">{order.status}</span></p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Price */}
              <div className="text-[#4A4A4AFF] text-lg font-semibold">
                {currency}{((item.product?.offerPrice || 0) * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Delivery Address */}
          {order.address && (
            <div className="mt-4 text-gray-700 text-sm">
              <strong className="text-primary">Delivery Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
