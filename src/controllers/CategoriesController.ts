// controllers/CategoryController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoriesController {
  private categoryRepository = AppDataSource.getRepository(Category);

  allCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryRepository.find();
    return res.status(200).send(categories);
  }
  
  addCategory = async (req:Request, res:Response) => {
    const category = this.categoryRepository.create(req.body)
    await this.categoryRepository.save(category)
    return res.status(200).send({ success: true, message:'Category is added', category })
}
}
