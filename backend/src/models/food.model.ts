import mongoose, { Schema, type Document } from "mongoose";

export interface Food extends Document {
    rating: {
        average: number;
        count: number;
    };
    name: string;
    createdDate: Date;
    category: string;
    description: string;
    image: string;
    ingredients: string[];
    initialQty: number;
    qty: number;
    price: number;
}

const FoodSchema: Schema = new Schema(
    {
      name: { type: String, required: true },
      createdDate: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      rating: {
        average: { type: Number, required: true },
        count: { type: Number, required: true },
      },
      ingredients: { type: [String], required: true },
      price: { type: Number, required: true },
      initialQty: {
        type: Number,
        required: true,
        validate: {
          validator: function (value: number) {
            return value >= 0;
          },
          message: "Initial quantity cannot be less than 0",
        },
      },
      qty: {
        type: Number,
        required: true,
        validate: [
          {
            validator: function (value: number) {
              return value >= 0;
            },
            message: "Quantity cannot be less than 0",
          },
          {
            validator: function (this: any, value: number) {
              return value <= this.initialQty;
            },
            message: "Quantity cannot be more than initial quantity",
          },
        ],
      },
    },
    { timestamps: true }
)

export default mongoose.model<Food>('Food', FoodSchema);