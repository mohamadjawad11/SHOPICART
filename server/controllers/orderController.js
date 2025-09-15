  import Product from "../models/Product.js";
  import Order from "../models/Order.js";
  import User from "../models/User.js";
  import mongoose from "mongoose";
  import stripe from 'stripe';
  import Stripe from "stripe";

  // export const placeOrderCOD=async(req,res)=>{

  //     try {
  //         const {userId,items,address}=req.body;
  //         if(!userId||!items||!address){
  //             return res.status(400).json({message:"Please provide all the required fields"});
  //         }
  //             let ammount=await items.reduce(async(acc,item)=>{
  //                 const product=await Product.findById(item.product);
  //             })
  //             return (await acc) + product.offerPrice *item.quantity;

  //             amount+=Math.floor(ammount*0.02);
  //             await Order.create({
  //                 userId,
  //                 items,
  //                 amount,
  //                 address,
  //                 paymentType:'COD'
  //             });
  //             return res.status(200).json({message:"Order placed successfully"});
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  export const placeOrderCOD = async (req, res) => {
    try {
      const { userId, items, address } = req.body;

      // Validate required fields
      if (!userId || !items || items.length === 0 || !address) {
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });
      }

      // Calculate total amount
      let totalAmount = 0;
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with id ${item.product} not found` });
        }
        totalAmount += product.offerPrice * item.quantity;
      }

      // Add 2% extra charge
      totalAmount += Math.floor(totalAmount * 0.02);

      // Create order with correct field names
      const newOrder = await Order.create({
        userId,
        items,
        ammount: totalAmount, // Match schema field
        address,
        paymentType: "COD",
      });

      return res
        .status(200)
        .json({
          success: true,
          message: "Order placed successfully",
          order: newOrder,
        });
    } catch (error) {
      console.error("Error placing order:", error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  };



  export const getUserOrders = async (req, res) => {
    try {
      const userId = req.userId; // from authUser

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: No userId" });
      }

      // Convert only if it's a string
      const castedUserId = mongoose.Types.ObjectId.isValid(userId)
        ? new mongoose.Types.ObjectId(userId)
        : userId;

      const orders = await Order.find({
        userId: userId, // use string as-is
        $or: [
          { paymentType: { $regex: /^COD$/i } }, // case-insensitive
          { isPaid: true },
        ],
      })
        .populate("items.product address")
        .sort({ createdAt: -1 });

      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error in getUserOrders:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Something went wrong",
          error: error.message,
        });
    }
  };

  export const getOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        return res.status(400).json({ message: "Please provide orderId" });
      }
      const order = await Order.findById(orderId).populate(
        "items.product address"
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  };

  export const getAllOrders = async (req, res) => {
    try {
      console.log("getAllOrders called, sellerId:", req.userId);
      const orders = await Order.find({$or:[{paymentType:"COD"},{isPaid:true}]})
                                .populate("items.product address")
                                .sort({ createdAt: -1 });
      console.log("orders fetched:", orders.length);
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("Error in getAllOrders:", error);
      return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
  };


  export const placeOrderStripe = async (req, res) => {
    try {
      const { userId, items, address } = req.body;

      const {origin}=req.headers;
      // Validate required fields
      if (!userId || !items || items.length === 0 || !address) {
        return res
          .status(400)
          .json({ message: "Please provide all the required fields" });
      }

      let productData=[];
      // Calculate total amount
      let totalAmount = 0;
      for (const item of items) {
        const product = await Product.findById(item.product);
        productData.push({
          name:product.name,
          price:product.offerPrice,
          quantity:item.quantity
        })
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with id ${item.product} not found` });
        }
        totalAmount += product.offerPrice * item.quantity;
      }

      // Add 2% extra charge
      totalAmount += Math.floor(totalAmount * 0.02);

      // Create order with correct field names
      const newOrder = await Order.create({
        userId,
        items,
        ammount: totalAmount, // Match schema field
        address,
        paymentType: "Online",
      });

      const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
      const line_items=productData.map((item)=>{
        return {
          price_data:{
            currency:'usd',
            product_data:{
              name:item.name,
          },
          unit_amount: Math.round((item.price + item.price * 0.02) * 100)

        },
        quantity:item.quantity,
      }
    })
    const session=await stripeInstance.checkout.sessions.create({
      line_items,
      mode:'payment',
      success_url:`${origin}/loader?next=my-orders`,
      cancel_url:`${origin}/cart`,
      metadata:{
        orderId:newOrder._id.toString(),
        userId,

      }
    })
      return res
        .status(200)
        .json({
          success: true,
          url:session.url,
          order: newOrder,
        });
    } catch (error) {
      console.error("Error placing order:", error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  };

    export const stripeWebhooks=async (req,res)=>{
     
        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
        const sig=req.headers["stripe-signature"];
        let event;

        try{
          event=stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
          );

        }catch(error){
            
            res.status(400).send(`Error processing webhook: ${error.message}`);
        }
      
        switch (event.type) {
          case "payment_intent.succeeded":{
              const paymentIntent=event.data.object;
              const paymentIntentId=paymentIntent.id;

              const session=await stripeInstance.checkout.sessions.list({
                  payment_intent:paymentIntentId,
              });
              const {orderId,userId}=session.data[0].metadata;

              await Order.findByIdAndUpdate(orderId,{
                isPaid:true
          })
          await User.findByIdAndUpdate(userId,{
            cartItems:{}
          })
          break;
        }
        case "payment_intent.failed":{
          const paymentIntent=event.data.object;
              const paymentIntentId=paymentIntent.id;

              const session=await stripeInstance.checkout.sessions.list({
                  payment_intent:paymentIntentId,
              });
              const {orderId}=session.data[0].metadata;
              await Order.findByIdAndDelete(orderId);
              break;

        }
          default:
          console.error(`Unhandled event type ${event.type}`);

          break;
        }
        res.json({received:true});
    }