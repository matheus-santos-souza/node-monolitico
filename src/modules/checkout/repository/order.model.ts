import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ClientModel } from "src/modules/client-adm/repository/client.model";
import { OrderProductModel } from "./order-product.model";

@Table({
    tableName: "orders",
    timestamps: false
})
export class OrderModel extends Model<OrderModel> {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare status: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare total: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @ForeignKey(() => ClientModel)
    declare client_id: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel

    @HasMany(() => OrderProductModel)
    declare products: OrderProductModel[];

    @Column({ allowNull: false, type: DataType.DATE, field: "created_at" })
    declare createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE, field: "updated_at" })
    declare updatedAt: Date;
}