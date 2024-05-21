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
            ],
        };
    }
    const result = yield products_model_1.Product.find(searchTerm);
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(await Product.isProductExist(id));
    if (!(yield products_model_1.Product.isProductExist(id))) {
        throw new Error('Product not exist');
    }
    const result = yield products_model_1.Product.findOne({ _id: id });
    return result;
});
const updateSingleProductFromDB = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield products_model_1.Product.isProductExist(id))) {
        throw new Error('Product not exist');
    }
    const result = yield products_model_1.Product.updateOne({ _id: id }, { $set: product });
    return result;
});
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
