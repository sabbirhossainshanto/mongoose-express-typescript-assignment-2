/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { productServices } from './product.services';
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const parseStudentData = createProductValidationSchema.parse(product);
    const result = await productServices.createProductIntoDB(parseStudentData);
    res.json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req?.query?.searchTerm;
    const result = await productServices.getAllProductFromDB(
      searchTerm as string,
    );
    res.json({
      success: true,
      message: 'Products are retrieve successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    res.json({
      success: true,
      message: 'Product retrieve successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const parseProduct = updateProductValidationSchema.parse(product);
    await productServices.updateSingleProductFromDB(productId, parseProduct);
    const result = await productServices.getSingleProductFromDB(productId);
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteSingleProductFromDB(productId);
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
