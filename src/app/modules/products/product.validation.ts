import { z } from 'zod';

// Variants schema
const createVariantsValidationSchema = z.object({
  type: z.string({ message: 'Type is required and cannot be empty' }),
  value: z.string({ message: 'Value is required and cannot be empty' }),
});

// Inventory schema
const createInventoryValidationSchema = z.object({
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean({ required_error: 'InStock is required' }),
});

// Product schema
export const createProductValidationSchema = z.object({
  name: z.string({ message: 'Name is required and cannot be empty' }),
  description: z.string({
    message: 'Description is required and cannot be empty',
  }),
  price: z
    .number({ required_error: 'Price is required' })
    .positive({ message: 'Price must be a positive number' }),
  category: z.string({ message: 'Category is required and cannot be empty' }),
  tags: z
    .array(z.string({ message: 'Tags cannot contain empty strings' }), {
      required_error: 'Tags are required',
    })
    .min(1, { message: 'At least one tag is required' }),
  variants: z
    .array(createVariantsValidationSchema, {
      required_error: 'Variants are required',
    })
    .min(1, { message: 'At least one variant is required' }),
  inventory: createInventoryValidationSchema,
});

/* update validation schema */
// Variants schema
const updateVariantsValidationSchema = z.object({
  type: z.string().optional(),
  value: z.string().optional(),
});

// Inventory schema
const updateInventoryValidationSchema = z.object({
  quantity: z.number().optional(),
  inStock: z.boolean().optional(),
});

// Product schema
export const updateProductValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(updateVariantsValidationSchema).optional(),
  inventory: updateInventoryValidationSchema.optional(),
});


