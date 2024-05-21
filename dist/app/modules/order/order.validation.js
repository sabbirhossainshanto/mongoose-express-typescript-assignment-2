"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderValidationSchema = void 0;
const zod_1 = require("zod");
exports.createOrderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email format' }),
    productId: zod_1.z.string({ required_error: "Product id is required" }),
    price: zod_1.z.number({ required_error: 'price is required' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
});
