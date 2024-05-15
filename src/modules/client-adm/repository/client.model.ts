import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "clients",
    timestamps: false
})
export class ClientModel extends Model<ClientModel> {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare email: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare address: string;

    @Column({ allowNull: false, type: DataType.DATE })
    declare createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    declare updatedAt: Date;
}