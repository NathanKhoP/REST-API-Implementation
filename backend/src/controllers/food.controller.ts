import FoodService from "@/services/food.service";
import formatResponse from "@/utils/formatResponse";
import { RequestHandler } from 'express';

class FoodController {
  public getFoods: RequestHandler = async (req, res, next) => {
    try {
      const foods = await FoodService.getFoods();
      res.status(200).json(formatResponse("success", "Menu items retrieved successfully", foods));
    } catch (error: any) {
      next(error);
    }
  };

  public getFoodById: RequestHandler = async (req, res, next) => {
    try {
      const food = await FoodService.getFoodById(req.params.id);
      res.status(200).json(formatResponse("success", "Menu item retrieved successfully", food));
    } catch (error: any) {
      next(error);
    }
  };

  public addFood: RequestHandler = async (req, res, next) => {
    try {
      const food = await FoodService.addFood(req.body);
      res.status(201).json(formatResponse("success", "Menu item added successfully", food));
    } catch (error: any) {
      next(error);
    }
  };

  public modifyFood: RequestHandler = async (req, res, next) => {
    try {
      const food = await FoodService.modifyFood(req.params.id, req.body);
      res.status(200).json(formatResponse("success", "Menu item updated successfully", food));
    } catch (error: any) {
      next(error);
    }
  };

  public deleteFood: RequestHandler = async (req, res, next) => {
    try {
      const food = await FoodService.deleteFood(req.params.id);
      res.status(200).json(formatResponse("success", "Menu item deleted successfully", food));
    } catch (error: any) {
      next(error);
    }
  };
}

export default new FoodController();