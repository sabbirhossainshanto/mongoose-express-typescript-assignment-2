/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidObjectId } from '../../utils';
import { TProduct } from './products.interface';
import { Product } from './products.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductFromDB = async (query: string) => {
  let searchTerm = {};
  if (query) {
    searchTerm = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    };
  }
  const result = await Product.find(searchTerm);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  /* Check for valid ObjectId */
  if (!isValidObjectId(id)) {
    throw new Error('Invalid product ID');
  }
  /* Throw error if the product is not exist */
  if (!(await Product.isProductExist(id))) {
    throw new Error('Product not exist');
  }
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateSingleProductFromDB = async (id: string, product: any) => {
  /* Check for valid ObjectId */
  if (!isValidObjectId(id)) {
    throw new Error('Invalid product ID');
  }
  /* Throw error if the product is not exist */
  if (!(await Product.isProductExist(id))) {
    throw new Error('Product not exist');
  }
  const result = await Product.updateOne({ _id: id }, { $set: product });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  /* Check for valid ObjectId */
  if (!isValidObjectId(id)) {
    throw new Error('Invalid product ID');
  }
  /* Throw error if the product is not exist */
  if (!(await Product.isProductExist(id))) {
    throw new Error('Product not exist');
  }
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
