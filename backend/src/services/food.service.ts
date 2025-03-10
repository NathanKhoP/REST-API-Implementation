import type { Food } from "@/models/food.model";
import FoodModel from "@/models/food.model";
import { isValidObjectId } from "mongoose";

export class FoodService {
  async addFood(foodData: Food): Promise<Food> {
    const food = new FoodModel(foodData);
    return await food.save();
  }

  async getFoods(): Promise<Food[]> {
    return await FoodModel.find();
  }

  async getFoodById(id: string | null): Promise<Food> {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ID... - ${id}`);
    }
    const food = await FoodModel.findById(id);
    if (!food) {
      throw new Error(`Food not found... - ${id}`);
    }
    return food;
  }

  async modifyFood(id: string, foodData: Food): Promise<Food> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(`Invalid ID... - ${id}`);
      }
      const updatedFood = await FoodModel.findByIdAndUpdate(id, foodData, {
        new: true,
      });
      if (!updatedFood) {
        throw new Error(`Food not found... - ${id}`);
      }
      return updatedFood;
    } 
    catch (error) {
      throw new Error(error);
    }
  }

  async deleteFood(id: string): Promise<Food> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error(`Invalid ID... - ${id}`);
      }
      const deletedFood = await FoodModel.findByIdAndDelete(id);
      if (!deletedFood) {
        throw new Error(`Food not found... - ${id}`);
      }
      return deletedFood;
    }
    catch (error) {
      throw new Error(error);
    }
  }
}

export default new FoodService();