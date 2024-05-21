import { Types } from 'mongoose'

export type TOrder = {
  email: string
  productId: Types.ObjectId
  price: number
  quantity: number
}
