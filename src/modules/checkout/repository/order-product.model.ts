import { Table, Column, Model, ForeignKey, PrimaryKey, DataType, BelongsTo } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ProductStoreCatalogModel } from "src/modules/store-catalog/repository/product.model";

@Table({
    tableName: "order_products",
    timestamps: false
})
export class OrderProductModel extends Model<OrderProductModel> {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string

    @Column({ allowNull: false, type: DataType.NUMBER, field: "sales_price" })
    declare salesPrice: number

    @ForeignKey(() => ProductStoreCatalogModel)
    @Column({ allowNull: false, type: DataType.STRING })
    declare product_id: string;

    @BelongsTo(() => ProductStoreCatalogModel)
    declare product: ProductStoreCatalogModel

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false, type: DataType.STRING })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel


    @Column({ allowNull: false, type: DataType.DATE, field: "created_at" })
    declare createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE, field: "updated_at" })
    declare updatedAt: Date;
}