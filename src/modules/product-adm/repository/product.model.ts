import { Column, Model, PrimaryKey, Table, DataType } from "sequelize-typescript";

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
    declare purchasePrice: number;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare stock: number;

    @Column({ allowNull: false, type: DataType.DATE })
    declare createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    declare updatedAt: Date;
}