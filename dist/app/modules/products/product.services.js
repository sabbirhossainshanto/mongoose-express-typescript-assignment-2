"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const utils_1 = require("../../utils");
const products_model_1 = require("./products.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(product);
    return result;
});
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield products_model_1.Product.find(searchTerm);
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /* Check for valid ObjectId */
    if (!(0, utils_1.isValidObjectId)(id)) {
        throw new Error('Invalid product ID');
    }
    /* Throw error if the product is not exist */
    if (!(yield products_model_1.Product.isProductExist(id))) {
        throw new Error('Product not exist');
    }
    const result = yield products_model_1.Product.findOne({ _id: id });
    return result;
});
const updateSingleProductFromDB = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    /* Check for valid ObjectId */
    if (!(0, utils_1.isValidObjectId)(id)) {
        throw new Error('Invalid product ID');
    }
    /* Throw error if the product is not exist */
    if (!(yield products_model_1.Product.isProductExist(id))) {
        throw new Error('Product not exist');
    }
    const result = yield products_model_1.Product.updateOne({ _id: id }, { $set: product });
    return result;
});
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /* Check for valid ObjectId */
    if (!(0, utils_1.isValidObjectId)(id)) {
        throw new Error('Invalid product ID');
    }
    /* Throw error if the product is not exist */
    if (!(yield products_model_1.Product.isProductExist(id))) {
        throw new Error('Product not exist');
    }
    const result = yield products_model_1.Product.deleteOne({ _id: id });
    return result;
});
exports.productServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
};
