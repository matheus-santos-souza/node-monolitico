import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false,
})
export class ProductModel extends Model<ProductModel> {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare description: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare salesPrice: number;
}