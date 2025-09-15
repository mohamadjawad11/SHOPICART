import React from 'react';
import { useAppContext } from '../context/AppContext';
import{Link, useParams} from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
const ProductDetail = () => {

    const {products,navigate,currency,addToCart}=useAppContext();
    const {id}=useParams();
    

    const [relatedProducts, setRelatedProducts] = React.useState([]);
    const [thumbnail, setThumbnail] = React.useState(null);

    const product=products.find((item)=>item._id===id);

    React.useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice();
            productsCopy=productsCopy.filter((item)=>product.category.toLowerCase()===item.category.toLowerCase());
            setRelatedProducts(productsCopy.slice(0,5));
        }
    },[products]);

    React.useEffect(()=>{
        if(product){
            setThumbnail(product?.image[0]?product.image[0]:null);
        }
    },[product]);
    return product && (
        <div className="mt-12">
            <p>
                <Link className='hover:text-primary' to={'/'}>Home</Link> /
                <Link className='hover:text-primary'  to={"/products"}> Products</Link> /
                <Link className='hover:text-primary' to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img className='hover:scale-110 cursor-pointer' src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2 ">
                    <h1 className="text-3xl font-medium ">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            
                                <img src={i<4 ?assets.star_icon:assets.star_dull_icon} alt='star' className='md:w-3.5 w3' />
                            
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base ">
                        <button onClick={()=>{addToCart(product._id)}} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/90 hover:bg-[#C4CBDBFF] transition rounded-[10px]" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(product._id);navigate('/cart')}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-[#007a5a] transition rounded-[10px]" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            
            <div className='flex flex-col items-center mt-30'>
              <div className='flex-col items-center w-max'>
              <p className='text-3xl font-medium'>Related Products</p>
              <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full'>
              {relatedProducts.filter(()=>product.inStock).map((product,index) => (
                <ProductCard key={index} product={product} />
              ))}</div>
              <button onClick={()=>{navigate('/products');scrollTo(0,0)}} className='mt-10 w-[200px] rounded-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-[#007a5a] transition'>See More</button>
            </div>
        </div>
    );
};
export default ProductDetail;