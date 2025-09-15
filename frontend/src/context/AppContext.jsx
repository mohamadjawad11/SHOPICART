import { createContext, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.message);
        console.log(error);
      }
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.message);
        console.log(error);
      }
      setUser(null);
      setCartItems({});
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setProducts(data.products);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId]) {
        newCart[itemId] += 1;
      } else {
        newCart[itemId] = 1;
      }
      return newCart;
    });
    toast.success("Item added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Item updated in cart");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  const getCartCount = () => {
    // let totalCount=0;
    // for(let item in cartItems){
    //     totalCount+=cartItems[item];
    // }
    // console.log('Cart count:', totalCount);
    // return totalCount;
    if (user) {
      let totalCount = 0;
      for (let item in cartItems) {
        totalCount += cartItems[item];
      }
      console.log("Cart count:", totalCount);
      return totalCount;
    } else if (user === null) {
      return 0;
    }
  };

  const getCartAmmount = () => {
    let totalAmount = 0;
    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        totalAmount += cartItems[id] * product.offerPrice; // use offerPrice or price
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();

    fetchSeller();
    fetchUser();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      try {
        if (!user || !user._id) return;
        const { data } = await axios.post("/api/cart/update", {
          userId: user._id,
          cartItems,
        });
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.log(error);
      }
    };
    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmmount,
    axios,
    fetchProducts,
    fetchUser,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
