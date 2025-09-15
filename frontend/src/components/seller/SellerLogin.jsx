import React, { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react'
import toast from 'react-hot-toast';


const SellerLogin = () => {
    const {isSeller,setIsSeller,navigate,axios} = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const {data}=await axios.post('/api/seller/seller-login',{email,password});
            if(data.success){
                toast.success(data.message);
                setIsSeller(true);
                navigate('/seller');
            }else{
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        
    }

      useEffect(()=>{
        if(isSeller){
            navigate("/seller");
        }
    },[isSeller])

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
            <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span>Login</p>
            <div className='w-full'>
                <p className='mb-2'>Email</p>
                <input type='text' placeholder='Enter your email' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary outline-primary' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Password</p>
                <input type='password' placeholder='Enter your password' className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary outline-primary' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer hover:bg-primary/80'>Login</button>
        </div>
    </form>
  )
}

export default SellerLogin
