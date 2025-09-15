import React from 'react'
import { useAppContext } from '../context/appContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';
const ProductCategory = () => {
    const {products}=useAppContext();
    const {category}=useParams();

    const searchCategory=categories.find((item)=>item.path.toLowerCase()===category.toLowerCase());

    const filteredProducts=products.filter((product)=>product.category.toLowerCase()===category.toLowerCase());


  return (
    <div className='mt-16'>
      {searchCategory &&(
        <div className='flex felx-col items-end w-max'> 
            <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className='w-16 -0.5 bg-primary rounded-full'> </div>
        </div>
      )}

      {filteredProducts.length>0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
          {filteredProducts.map((product)=>(
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <div className='mt-10 text-center'>
          <h1 className='text-2xl font-medium'>No Products Found</h1>
          <p className='text-gray-500/70'>
            Sorry, we couldn't find any products matching your search criteria.
          </p>
        </div>
          )}
    </div>
  )
}

export default ProductCategory
