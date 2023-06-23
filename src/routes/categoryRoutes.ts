import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

const categoryRoutes = Router();

categoryRoutes.get("/", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(Category).find();
  return res.status(200).send(users);
});

categoryRoutes.post("/",async (req:Request, res:Response) => {
    const category = AppDataSource.getRepository(Category).create(req.body)
    const results = await AppDataSource.getRepository(Category).save(category)
    return res.status(200).send({ success: true, message:'Category is added', category })
})

export default categoryRoutes;