import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { CategoriesController } from "../controllers/CategoriesController";

const categoryRoutes = Router();

const categoryController = new CategoriesController()


categoryRoutes.get("/", categoryController.allCategories);

categoryRoutes.post("/", categoryController.addCategory);

export default categoryRoutes;