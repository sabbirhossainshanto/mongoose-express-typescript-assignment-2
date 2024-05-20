/* eslint-disable @typescript-eslint/no-explicit-any */
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
      ],
    };
  }
  const result = await Product.find(searchTerm);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductFromDB = async (id: string, product: any) => {
  const result = await Product.updateOne({ _id: id }, { $set: product });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
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
