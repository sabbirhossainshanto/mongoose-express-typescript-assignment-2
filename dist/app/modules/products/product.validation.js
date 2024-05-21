"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
// Variants schema
const createVariantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string({ message: 'Type is required and cannot be empty' }),
    value: zod_1.z.string({ message: 'Value is required and cannot be empty' }),
});
// Inventory schema
const createInventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number({ required_error: 'Quantity is required' })
        .min(0, { message: 'Quantity must be a non-negative number' }),
    inStock: zod_1.z.boolean({ required_error: 'InStock is required' }),
});
// Product schema
exports.createProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ message: 'Name is required and cannot be empty' }),
    description: zod_1.z.string({
        message: 'Description is required and cannot be empty',
    }),
    price: zod_1.z
        .number({ required_error: 'Price is required' })
        .positive({ message: 'Price must be a positive number' }),
    category: zod_1.z.string({ message: 'Category is required and cannot be empty' }),
    tags: zod_1.z
        .array(zod_1.z.string({ message: 'Tags cannot contain empty strings' }), {
        required_error: 'Tags are required',
    })
        .min(1, { message: 'At least one tag is required' }),
    variants: zod_1.z
        .array(createVariantsValidationSchema, {
        required_error: 'Variants are required',
    })
        .min(1, { message: 'At least one variant is required' }),
    inventory: createInventoryValidationSchema,
});
/* update validation schema */
// Variants schema
const updateVariantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    value: zod_1.z.string().optional(),
});
// Inventory schema
const updateInventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().optional(),
    inStock: zod_1.z.boolean().optional(),
});
// Product schema
exports.updateProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    variants: zod_1.z.array(updateVariantsValidationSchema).optional(),
    inventory: updateInventoryValidationSchema.optional(),
});
