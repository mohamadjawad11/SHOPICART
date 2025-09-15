import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();

    // Filter products that are in stock and take the first 5
    const bestSellers = products.filter(product => product.inStock > 0).slice(0, 5);

    return (
        <div className='mt-24'>
            <p className='text-2xl md:text-3xl font-medium ml-[170px] xl:ml-0'>Best Seller</p>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {bestSellers.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}

export default BestSeller;