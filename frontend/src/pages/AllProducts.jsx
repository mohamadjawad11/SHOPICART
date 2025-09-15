import React from 'react'
import { useAppContext } from '../context/appContext';
import ProductCard from '../components/ProductCard';
const AllProducts = () => {
    const {products,searchQuery}=useAppContext();
    const [filteredProducts,setFilterProducts]=React.useState([]);

    React.useEffect(()=>{
        if(searchQuery.length>0){
            setFilterProducts(products.filter(product=>product.name.toLowerCase().includes(searchQuery.toLowerCase())));
        }else{
            setFilterProducts(products);
        }
        },[products,searchQuery])

  return (
    <div className='mt-16 felx flex-col'>
      <div className='flex felx-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
            <ProductCard key={index} product={product} />
        ))}
    </div>

    </div>
  )
}

export default AllProducts
