import express from 'express';
import dotenv from "dotenv"
import connectDB from './config/database.js';
import cookieParser from "cookie-parser";
import productRoutes from './routes/Product.js';
import brandRoutes from './routes/Brand.js';
import categoryRoutes from './routes/Category.js';
import userRoutes from './routes/User.js';
import authRoutes from './routes/Auth.js';
import cartRoutes from './routes/Cart.js';
import orderRoutes from './routes/Order.js';
import cors from 'cors';
import stripe from 'stripe';
import Order from './models/Order.js';
dotenv.config();

const stripeInstance = stripe('sk_test_51PGhcHSGaCB5kEHH2hFDN4RbYrDmZ3naOTlLvcvBkhpC3uYx4rg1knx3yR1pXGOByp0BVNm1tYDEir6XeevDNRIn00hRsIf4Yf');
const app = express();
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_b7632c8ef7bd7ee65e793a2fa15019b6fe57d885771b532354b54e319975ddf0";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("payment ke baad",event);
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log("payemnt aa gayi hai");
      const paymentIntentSucceeded = event.data.object;
      
      // console.log(paymentIntentSucceeded);
      // const orderID = paymentIntentSucceeded.metadata.orderId;
      // const order = await Order.findOne({orderID});
      // console.log(order);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    case 'charge.succeeded':
      console.log("charge aa gayi hai");
      const chargeSucceeded = event.data.object;
      // console.log(chargeSucceeded);
      // const orderID = chargeSucceeded.metadata.orderId;
      // const order = await Order.findOne({orderID});
      // console.log(order);
      // Then define and call a function to handle the event charge.succeeded
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        exposedHeaders : ['X-Total-Count']
    }
));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
const PORT = process.env.PORT || 8080;

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
// Indian Test Visa Card: 4000 0035 6000 0008
app.post('/create-payment-intent', async (req, res) => {
    const { currentOrder } = req.body;
    console.log(currentOrder);
    const orderId = currentOrder.id;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: currentOrder.totalAmount * 100, // for decimal compensation
      currency: 'inr',
      shipping: {
        name: currentOrder.selectedAddress.name,
        address: {
          line1: currentOrder.selectedAddress.street,
          city: currentOrder.selectedAddress.city,
          postal_code: currentOrder.selectedAddress.pincode,
          state: currentOrder.selectedAddress.state,
          country: "IN",
        },
      },
      description: `Ecommerce Website`,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId,
      },
    });
    console.log("payment initiated ",paymentIntent)
    res.send({
      clientSecret: paymentIntent.client_secret,
      success: true,
    });
  });
  

connectDB();

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})