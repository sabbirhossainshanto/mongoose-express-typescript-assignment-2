import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/products/product.route';
import { orderRoutes } from './app/modules/order/order.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//applications route

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
