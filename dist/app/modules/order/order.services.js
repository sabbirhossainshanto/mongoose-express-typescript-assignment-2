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
exports.orderServices = void 0;
const products_model_1 = require("../products/products.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    /* Find product by order id */
    const existingProduct = yield products_model_1.Product.findOne({ _id: order.productId });
    if (!existingProduct) {
        throw new Error('Order not found');
    }
    /* If quantity less that and equal 0 then sending error and updating isStock to false */
    if (Number(existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.inventory.quantity) <= 0) {
        yield products_model_1.Product.updateOne({ _id: order.productId }, { $set: { 'inventory.inStock': false } });
        throw new Error('Insufficient quantity available in inventory');
    }
    /* Order create */
    const result = yield order_model_1.Order.create(order);
    /* reduce the quantity of the ordered product */
    if (result.productId) {
        yield products_model_1.Product.updateOne({ _id: order.productId }, { $inc: { 'inventory.quantity': -order.quantity } });
    }
    return result;
});
const getAllOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = {};
    if (email) {
        searchTerm = { email: email };
    }
    const result = yield order_model_1.Order.find(searchTerm);
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
};
