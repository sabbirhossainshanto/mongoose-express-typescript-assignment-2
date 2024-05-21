/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { createOrderValidationSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parseOrder = createOrderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderIntoDB(parseOrder);
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      data: null,
    });
  }
};

export const orderController = {
  createOrder,
};
