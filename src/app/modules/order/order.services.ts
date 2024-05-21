import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
};
