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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req?.query?.email;
    const result = await orderServices.getAllOrderFromDB(email as string);
    res.json({
      success: true,
      message: 'Orders are retrieve successfully!',
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
  getAllOrders,
};
