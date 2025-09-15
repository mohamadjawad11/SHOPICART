import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from "/src/assets/assets.js";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';


const Navbar = () => {
    const [open, setOpen] = React.useState(false)
 const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount, setCartItems } = useAppContext(); // <-- Add setCartItems here

const logout = async () => {
try {
 const { data } = await axios.post('/api/user/logout');
 if (data.success === false) {
 toast.error(data.message);
 return;
 }
 toast.success('Logged out successfully');
 setUser(null);
 setCartItems({});
 navigate('/');
 } catch (error) {
 console.log(error);
 }
}


 useEffect(() => {
 if(searchQuery.length>0){
 navigate('/products');
 }
 }, [searchQuery])


    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/' onClick={() => setOpen(false)} className='transform transition duration-300 hover:scale-105'>
                 <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold select-none">
      <span className="text-[#4fbf8b]">Shopi</span><span className="text-gray-800">Cart</span>
    </h1>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/' className='font-medium transition duration-300 hover:text-primary'>Home</NavLink>
                <NavLink to='/products' className='font-medium transition duration-300 hover:text-primary'>All Products</NavLink>
                <NavLink to='/contact' className='font-medium transition duration-300 hover:text-primary'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full group transition duration-300 hover:border-primary">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 group-hover:placeholder-primary-dull cursor-pointer transition duration-300 " type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='h-4 w-4 opacity-70 group-hover:opacity-100 cursor-pointer' />
                </div>

                <div onClick={() => navigate("/cart")} className="relative cursor-pointer transition duration-300 hover:scale-110">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80 cursor-pointer' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full cursor-pointer">{getCartCount()}</button>
                </div>

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-[#9BACB7FF] transition-all text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} alt='profile' className='w-10 cursor-pointer transition duration-300 hover:scale-110' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow-lg border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 transition-colors duration-200 cursor-pointer'>MyOrders</li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 transition-colors duration-200 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )}

            </div>

            <div className="flex items-center gap-6 sm:hidden">
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer transition duration-300 hover:scale-110">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80 cursor-pointer' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                 <button onClick={() => setOpen(!open)} aria-label="Menu" className="transform transition duration-300 hover:scale-110">
                <img src={assets.menu_icon} alt='menu' />
            </button>
            </div>

           

            {/* Mobile Menu */}
            {
                open && (
                    <div className={`absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden transition-all duration-300 ${open ? 'flex opacity-100' : 'hidden opacity-0'}`}>
                        <NavLink to='/' onClick={() => setOpen(false)} className='py-2 w-full px-2 rounded-md transition-colors duration-200 hover:bg-gray-100 hover:text-primary'>Home</NavLink>
                        <NavLink to='/products' onClick={() => setOpen(false)} className='py-2 w-full px-2 rounded-md transition-colors duration-200 hover:bg-gray-100 hover:text-primary'>All Products</NavLink>
                        {user && <NavLink to='/contact' onClick={() => setOpen(false)} className='py-2 w-full px-2 rounded-md transition-colors duration-200 hover:bg-gray-100 hover:text-primary'>MyOrders</NavLink>}
                        <NavLink to='/contact' onClick={() => setOpen(false)} className='py-2 w-full px-2 rounded-md transition-colors duration-200 hover:bg-gray-100 hover:text-primary'>Contact</NavLink>

                        {!user ? (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setShowUserLogin(true);
                                }}
                                className="cursor-pointer px-6 py-2 mt-2 bg-primary  transition-all text-white rounded-full text-sm w-full hover:bg-[#D9ECF8FF]"
                            >
                                Login
                            </button>
                        ) : (
                            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-darker transition-all text-white rounded-full text-sm w-full">
                                Logout
                            </button>
                        )}
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar