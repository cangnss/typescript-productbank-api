import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";

const productRoutes = Router();

productRoutes.get("/", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(Product).find();
  return res.status(200).send(users);
});

productRoutes.post("/",async (req:Request, res:Response) => {
    const { product_name, product_description, category_id } = req.body
    const category = await AppDataSource.getRepository(Category).findOneBy({ id: category_id })
    
    if (!category) {
        return res.status(404).json({ success: false, message: ' Category not found!' });
    }

    const product = new Product()
    product.product_name = product_name;
    product.product_description = product_description;
    product.category = category;
    await AppDataSource.manager.save(product)
    return res.status(200).send({ success: true, message: 'Product is added!' })
})

productRoutes.get("/getProductsCategory", async (req: Request, res: Response) => {
    try {
        const products = await AppDataSource.getRepository(Product)
                                            .createQueryBuilder("product")
                                            .innerJoinAndSelect("product.category", "category")
                                            .getMany()
    
        return res.status(200).send({ success: true, message:"Get all products with category", products})    
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'error' })
    }
})

productRoutes.put("/:id", async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id)
    const categoryId = parseInt(req.body.category_id)

    const updatedProduct: Product = await req.body
    const product: Product = await getProduct(productId)
    const category: Category = await getCategory(categoryId)
    
    if (product == null || category == null) {
        return res.status(404).send({ success: false, message: 'Product or category is not found!' })
    }


    // product.product_name = updatedProduct.product_name
    // product.product_description = updatedProduct.product_description
    // product.category = category
    AppDataSource.getRepository(Product).merge(product, req.body)
    await AppDataSource.getRepository(Product).save(product)
    return res.status(200).send({ success: true, message:'Product is updated!', product})
})

productRoutes.get("/:id", async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id)
    const product: Product = await getProduct(productId)
    if (product == null) {
        return res.status(404).send({ success:false, message:"Product isn't found!"})
    }
    return res.status(200).send(product);
})

productRoutes.delete("/:id", async (req:Request, res: Response) => {
    const productId = parseInt(req.params.id)

    const product: Product = await getProduct(productId)
    if (product == null) {
        return res.status(404).send({ success: false, message:"Product isn't found!" })
    }
    await AppDataSource.getRepository(Product).delete(req.params.id)
    return res.status(200).send({ success: true, message: 'Product is deleted!'})
})

const getProduct = (productId: number) => {
    return AppDataSource.getRepository(Product)
                        .findOne({where : { id: productId }})
}

const getCategory = (categoryId: number) => {
    return AppDataSource.getRepository(Category)
                        .findOne({where : { id: categoryId }})
}



export default productRoutes;