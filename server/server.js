import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();

const port = process.env.PORT || 3000;

await connectDB();
connectCloudinary();



const allowedOrigins = [
  'http://localhost:5173',
  'https://shopicart-beta.vercel.app' 
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

app.use(express.json());
app.use(cookieParser());


app.use('/api/user',userRoute);
app.use('/api/seller',sellerRoute);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

