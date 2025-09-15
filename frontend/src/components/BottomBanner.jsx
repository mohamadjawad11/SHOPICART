import React from 'react'
import { assets, features } from "../assets/assets.js";
const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
        <img src={assets.bottom_banner_image} alt='bottom banner' className='w-full hidden md:block mb-[20px] md:mb-0' />
        <img src={assets.bottom_banner_image_sm} alt='bottom banner' className='w-full md:hidden mb-[20px] md:mb-0' />

        <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-10 md:pr-50 '>
            <div >
                <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>Why We Are The Best</h1>
                {features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-2 mb-7'>
                        <img src={feature.icon} alt='feature' className='w-8 h-8' />
                       <div>
                        <strong className='text-sm font-medium text-gray-700/90'>{feature.title}</strong>
                        <p className='text-xs md:text-sm text-gray-500/60'>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BottomBanner
