import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ]
});

// Middleware para realizar populate en la consulta
cartSchema.pre(/^find/, function(next) {
  this.populate('products.product');
  next();
});

export const cartModel = model('carts', cartSchema);