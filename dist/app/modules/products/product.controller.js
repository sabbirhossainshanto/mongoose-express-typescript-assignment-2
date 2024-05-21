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
exports.productController = void 0;
const product_services_1 = require("./product.services");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const parseStudentData = product_validation_1.createProductValidationSchema.parse(product);
        const result = yield product_services_1.productServices.createProductIntoDB(parseStudentData);
        res.json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: null,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const searchTerm = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        const result = yield product_services_1.productServices.getAllProductFromDB(searchTerm);
        res.json({
            success: true,
            message: searchTerm
                ? `Products matching search term ${searchTerm} fetched successfully`
                : 'Products are retrieve successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: null,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.productServices.getSingleProductFromDB(productId);
        res.json({
            success: true,
            message: 'Product retrieve successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: null,
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = req.body;
        const parseProduct = product_validation_1.updateProductValidationSchema.parse(product);
        yield product_services_1.productServices.updateSingleProductFromDB(productId, parseProduct);
        const result = yield product_services_1.productServices.getSingleProductFromDB(productId);
        res.json({
            success: true,
            message: 'Product updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: null,
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.productServices.deleteSingleProductFromDB(productId);
        res.json({
            success: true,
            message: 'Product deleted successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            data: null,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
