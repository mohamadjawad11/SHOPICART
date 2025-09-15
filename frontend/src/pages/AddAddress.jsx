import React from 'react';
import { useState,useEffect } from 'react';
 import { assets } from '../assets/assets';
 import { useAppContext } from '../context/AppContext';
 import toast from 'react-hot-toast';

// This is the main component. Make sure to export it as the default.
const App = () => {
    // State to hold all the address form data.
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const [loading]=useState(false);

    const {axios,user,navigate}=useAppContext();


    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    }

    
const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
        const {data} = await axios.post('/api/address/add', {
            address,
            userId: user._id
        });
        if(data.success){
            toast.success('Address added successfully');
            navigate('/cart');
        }else{
            toast.error(data.message);
        }
    }catch(error){
        toast.error(error.response?.data?.message || error.message);
        console.log(error);
    }
}


    useEffect(()=>{
        if(!user){
            navigate('cart');
        }
    },[])
    return (
        // Main container with a flexible layout for centering.
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Card-like container for the form and the illustration. */}
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row max-w-6xl w-full overflow-hidden">
                
                {/* Left side: The form for adding an address. */}
                <div className="flex-1 p-8 md:p-12 lg:p-16">
                    <h1 className="text-3xl lg:text-4xl font-semibold text-gray-700 mb-6">
                        Add Shipping <span className="text-primary">Address</span>
                    </h1>

                    {/* Form grid layout for a responsive two-column design. */}
                    {/* The form has an onSubmit handler to prevent default behavior and log the data. */}
                    <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        
                        {/* First Name Input */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='firstName'
                                value={address.firstName} // Bind value to state
                                onChange={handleChange} // Correctly use onChange attribute
                                required
                            />
                        </div>
                        
                        
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='lastName'
                                value={address.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                       
                        <div className="md:col-span-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='email'
                                value={address.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Street"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='street'
                                value={address.street}
                                onChange={handleChange}
                            />
                        </div>

                        
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='city'
                                value={address.city}
                                onChange={handleChange}
                            />
                        </div>
                        
                        
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="State"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='state'
                                value={address.state}
                                onChange={handleChange}
                            />
                        </div>
                        
                        
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Zip code"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='zipCode'
                                value={address.zipCode}
                                onChange={handleChange}
                            />
                        </div>

                     
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='country'
                                value={address.country}
                                onChange={handleChange}
                            />
                        </div>
                        
                      
                        <div className="md:col-span-2">
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                name='phone'
                                value={address.phone}
                                onChange={handleChange}
                            />
                        </div>
                        
                        
                        <div className="md:col-span-2 mt-4">
                            <button
                                type="submit"
                                className="w-full p-4 bg-primary text-white rounded-lg font-medium hover:primary transition-colors cursor-pointer hover:bg-[#BDD7D0FF]"
                            >
                                {loading?'Saving...':'SAVE ADDRESS'}

                            </button>
                        </div>
                    </form>
                </div>

               
                <div className="hidden lg:flex-1 lg:flex items-center justify-center p-8 bg-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 primary rounded-full transform translate-x-1/4 -translate-y-1/4 opacity-30"></div>
                    
                    
                    <img
                        src={assets.add_address_iamge}
                        alt="Person with a laptop and a location pin"
                        className="w-full max-w-md h-auto"
                        style={{ filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))' }}
                    />
                </div>

            </div>
        </div>
    );
};

export default App;
