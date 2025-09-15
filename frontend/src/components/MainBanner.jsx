import React from 'react';
import { assets } from "/src/assets/assets.js";
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} alt='banner' className='w-full hidden md:block'/>
      <img src={assets.main_banner_bg_sm} alt='banner' className='w-full md:hidden'/>

      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:items-start md:text-left md:pl-16 lg:pl-24 mt-80 md:mt-0 xl:mt-0'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 mb-6'>Freshness You Can Trust, Savings You Will Love!</h1>
      
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4'>
          <Link to={"/products"} className='flex items-center justify-center w-[170px] xl:w-[170px] md:w-auto px-7 py-3 bg-primary hover:bg-[#68716DFF] transition rounded-[15px] text-white cursor-pointer'>
            Shop Now
          </Link>
          <Link to={"/products"} className='flex items-center justify-center  md:w-auto px-7 py-3 bg-[#09774BFF] text-white hover:bg-[#68716DFF]/90 rounded-[15px] transition'>
            Explore Deals <img src={assets.white_arrow_icon} alt='arrow' className='w-4 h-4 ml-2'/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;