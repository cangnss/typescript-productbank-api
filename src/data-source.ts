import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Category } from "./entity/Category"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "e2pproductbank",
    synchronize: true,
    logging: false,
    entities: [User, Product, Category],
    migrations: [],
    subscribers: [],
})
