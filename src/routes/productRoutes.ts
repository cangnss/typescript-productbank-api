import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

const productRoutes = Router();

productRoutes.get("/", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(Product).find();
  return res.status(200).send(users);
});



export default productRoutes;