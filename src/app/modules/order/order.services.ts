import { Product } from '../products/products.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  /* Find product by order id */
  const orderingProduct = await Product.findOne({ _id: order.productId });
  /* If quantity less that and equal 0 then sending error and updating isStock to false */
  if (Number(orderingProduct?.inventory.quantity) <= 0) {
    await Product.updateOne(
      { _id: order.productId },
      { $set: { 'inventory.inStock': false } },
    );
    throw new Error('Insufficient quantity available in inventory');
  }
  /* reduce the quantity of the ordered product */
  if (result.productId) {
    await Product.updateOne(
      { _id: order.productId },
      { $inc: { 'inventory.quantity': -order.quantity } },
    );
  }
  return result;
};

const getAllOrderFromDB = async (email: string) => {
  let searchTerm = {};
  if (email) {
    searchTerm = { email: email };
  }

  const result = await Order.find(searchTerm);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
