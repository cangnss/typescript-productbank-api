import { AppDataSource } from "./data-source"
import * as express from "express"
import { Express, Request, Response } from "express"
import userRouters from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import bodyParser = require("body-parser")
import { authRoutes } from "./routes/authRoutes"

AppDataSource
        .initialize()
        .then(()=>{
            console.log("data source has been initialized!!");
        })
        .catch((err)=>{
            console.log("error data source");
        })


const app: Express = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use("/users", userRouters)
app.use("/products", productRoutes)
app.use("/category", categoryRoutes)
app.use("/auth", authRoutes)

app.get("/", async (req:Request, res: Response) => {
    return res.send("hi2123")
})

app.listen(3001, ()=>{
    console.log(`[server] Server is running: http://localhost:3001`);
})