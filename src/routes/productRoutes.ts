import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { ProductsController } from "../controllers/ProductsController";

const productRoutes = Router();

const productControllers = new ProductsController();

productRoutes.get("/", productControllers.allProducts);

productRoutes.post("/", productControllers.addProduct);

productRoutes.get("/getProductsCategory", productControllers.getProductsByCategory)

productRoutes.put("/:id", productControllers.updateProduct)

productRoutes.get("/:id", productControllers.getProductDetail)

productRoutes.delete("/:id", productControllers.deleteProduct)

export default productRoutes;