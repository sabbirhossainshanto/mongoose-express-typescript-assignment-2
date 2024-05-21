import { isValidObjectId } from '../../utils';
import { Product } from '../products/products.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  /* Check for valid ObjectId */
  if (!isValidObjectId(order.productId)) {
    throw new Error('Invalid product ID');
  }
  /* Find product by order id */
  const existingProduct = await Product.findOne({ _id: order.productId });
  /* if product not exist then throwing error */
  if (!existingProduct) {
    throw new Error('Order not found');
  } else if (!existingProduct.inventory.inStock) {
    /* If existing product inStock = false then throwing an error */
    throw new Error('Insufficient quantity available in inventory');
  } else if (order.quantity > existingProduct.inventory.quantity) {
    /* if order quantity is greater than product quantity then throwing an error*/
    throw new Error('Order quantity is greater than product quantity');
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
  /* After creating order finding the existing order */
  const findCreatedOrderProduct = await Product.findOne({
    _id: order.productId,
  });
  /* If quantity less  than and equal 0 then updating isStock to false */
  if (Number(findCreatedOrderProduct?.inventory.quantity) <= 0) {
    await Product.updateOne(
      { _id: order.productId },
      { $set: { 'inventory.inStock': false } },
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
