import React from 'react'
import { useAppContext } from '../../context/AppContext';
import {assets} from '../../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
const SellerLayout = () => {
    const {setIsSeller,axios,navigate} = useAppContext();
    

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon:assets.add_icon  },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.post('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                // The crucial fix: update the local state after a successful logout
                setIsSeller(false); 
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
                <Link to='/'>
                <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold select-none">
                <span className="text-[#4fbf8b]">Shopi</span><span className="text-gray-800">Cart</span>
                </h1>
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hello! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1 hover:bg-primary/10 cursor-pointer'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                 <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path==="/seller"}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white "
                            }`
                        }
                    >
                        <img src={item.icon} alt={item.name} className='w-7 h-7' />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet />
            </div>
           
        </>
    );
};

export default SellerLayout;