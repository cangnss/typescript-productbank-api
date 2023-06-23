import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find();
  return res.status(200).send(users);
});

userRouter.get("/:id",async (req:Request, res: Response) => {
    const userId = parseInt(req.params.id)

    if (isNaN(userId)) {
        return res.status(400).send("Invalid user id");
    }

    const user = await AppDataSource.getRepository(User).findOneBy({
        id: userId
    })

    if (!user) {
        return res.status(404).send("User not found");
    }

    return res.status(200).send(user) 
})

userRouter.post("/", async (req:Request, res:Response) => {
    const user = AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.status(200).send("User is added!")
})

userRouter.delete("/:id",async (req:Request, res: Response) => {
    const userId = parseInt(req.params.id)
    const user = await AppDataSource.getRepository(User).delete(userId)
    return res.status(200).send({ success: true, message:"User is deleted!" })
})



export default userRouter;