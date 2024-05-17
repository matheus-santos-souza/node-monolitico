import { Model, Column, PrimaryKey, Table, DataType, HasMany } from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-tem.model";

@Table({
    tableName: "invoices",
    timestamps: false
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false, type: DataType.STRING })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare document: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare city: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare complement: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare number: number;

    @Column({ allowNull: false, type: DataType.STRING })
    declare state: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare street: string;

    @Column({ allowNull: false, type: DataType.STRING, field: "zip_code" })
    declare zipCode: string;

    @Column({ allowNull: false, type: DataType.DATE, field: "created_at" })
    declare createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE, field: "updated_at" })
    declare updatedAt: Date;

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];
}