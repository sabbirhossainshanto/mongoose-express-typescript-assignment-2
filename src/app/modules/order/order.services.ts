import { Product } from '../products/products.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  /* Find product by order id */

  const existingProduct = await Product.findOne({ _id: order.productId });
  if (!existingProduct) {
    throw new Error('Order not found');
  }
  /* If quantity less that and equal 0 then sending error and updating isStock to false */
  if (Number(existingProduct?.inventory.quantity) <= 0) {
    await Product.updateOne(
      { _id: order.productId },
      { $set: { 'inventory.inStock': false } },
    );
    throw new Error('Insufficient quantity available in inventory');
  }
  /* Order create */
  const result = await Order.create(order);
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
