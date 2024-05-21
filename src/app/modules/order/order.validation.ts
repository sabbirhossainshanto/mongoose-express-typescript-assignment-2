import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  productId: z.string({required_error:"Product id is required"}),
  price: z.number({ required_error: 'price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});
