import express  from 'express';
import categoryRouter from './routes/category.routes.js';
import userRouter from './routes/user.routes.js';
import vendorRouter from './routes/vendor.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import cartRouter from './routes/cart.routes.js';
import cors from 'cors';
// import dotenv from 'dotenv';
import { connection } from './config/dbConfig.js';
import bodyParser from 'body-parser';
// dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/category', categoryRouter);
app.use('/user', userRouter);
app.use('/vendor', vendorRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.listen(4000, () => {
    console.log("server started....");
});