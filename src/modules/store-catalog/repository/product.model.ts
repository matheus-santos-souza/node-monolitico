import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: 'product-store-catalog-table',
    tableName: "products",
    timestamps: false,
})
export class ProductStoreCatalogModel extends Model<ProductStoreCatalogModel> {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare description: string;

    @Column({ allowNull: false, type: DataType.NUMBER, field: "sales_price" })
    declare salesPrice: number;
}