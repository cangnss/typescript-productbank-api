import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Category } from "./Category"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_name: string

    @Column()
    product_description: string

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category: Category
}
