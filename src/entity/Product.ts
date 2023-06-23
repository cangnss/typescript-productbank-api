import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Category } from "./Category"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productName: string

    @Column()
    productDescription: string

    @ManyToOne(() => Category, (category) => category.categoryName)
    category: Category
}
