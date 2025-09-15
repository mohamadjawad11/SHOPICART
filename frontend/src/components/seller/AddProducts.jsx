import React from 'react'
import { assets, categories } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const AddProducts = () => {
    const [files, setFiles] = React.useState([]);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [offerPrice, setOfferPrice] = React.useState('');
    const [loading, setLoading] = React.useState(false); // ✅ For form submission
    const [uploading, setUploading] = React.useState(false); // ✅ For image upload

    const {axios} = useAppContext();

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const productData = { name, description: description.split('\n'), category, price, offerPrice };
            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) formData.append('images', files[i]);

            const { data } = await axios.post('/api/product/add', formData);

            if (data.success) {
                toast.success(data.message);

                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message); 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); 
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true); // ✅ Start uploading state
            const updatedFiles = [...files];
            updatedFiles[index] = file;
            setFiles(updatedFiles);
            // Simulate short delay for preview (optional)
            setTimeout(() => {
                setUploading(false); // ✅ Stop after preview
            }, 500); 
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">
                        {uploading ? 'Uploading Image...' : 'Product Image'}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input 
                                    onChange={(e) => handleImageChange(e, index)} 
                                    accept="image/*" 
                                    type="file" 
                                    id={`image${index}`} 
                                    hidden 
                                />
                                <img 
                                    className='max-w-24 cursor-pointer' 
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} 
                                    alt="product-preview" 
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=>{
                        setName(e.target.value);
                    }} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=>{
                        setDescription(e.target.value);
                    }} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=>{
                        setCategory(e.target.value);
                    }} value={category} id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=>{
                        setPrice(e.target.value);
                    }} value={price} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=>{
                        setOfferPrice(e.target.value);
                    }} value={offerPrice} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button 
                    className={`px-8 py-2.5 text-white font-medium rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dull cursor-pointer'}`} 
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'ADD'}
                </button>
            </form>
        </div>
    )
}

export default AddProducts;
