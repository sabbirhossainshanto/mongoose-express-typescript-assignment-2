import { Product } from '../products/products.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  const findProduct = await Product.findOne({ _id: order.productId });
  
  if (Number(findProduct?.inventory.quantity) <= 0) {
    await Product.updateOne(
      { _id: order.productId },
      { $set: { 'inventory.inStock': false } },
    );
    throw new Error('Insufficient quantity available in inventory');
  }

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
