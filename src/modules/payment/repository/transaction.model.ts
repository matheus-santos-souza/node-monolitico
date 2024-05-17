import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "payments",
    timestamps: false
})
export class TransactionModel extends Model<TransactionModel> {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING, field: "order_id" })
    declare orderId: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare amount: number;

    @Column({ allowNull: false, type: DataType.STRING })
    declare status: string;

    @Column({ allowNull: false, type: DataType.DATE, field: "created_at" })
    declare createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE, field: "updated_at" })
    declare updatedAt: Date;
}