import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel } from "src/modules/invoice/repository/invoice-tem.model";
import { migrator } from "src/test-migrations/config-migrations/migrator";
import { ClientModel } from "src/modules/client-adm/repository/client.model";
import { ProductModel } from "src/modules/product-adm/repository/product.model";
import { OrderProductModel } from "src/modules/checkout/repository/order-product.model";
import { ProductStoreCatalogModel } from "src/modules/store-catalog/repository/product.model";
import { OrderModel } from "src/modules/checkout/repository/order.model";
import { Umzug } from "umzug";
import { InvoiceModel } from "src/modules/invoice/repository/invoice.model";
import { TransactionModel } from "src/modules/payment/repository/transaction.model";

const MODELS = [ClientModel, ProductModel, ProductStoreCatalogModel, OrderModel, OrderProductModel, InvoiceModel, InvoiceItemModel, TransactionModel]

export class SequelizeFactory {
   
    static async create() {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        })
        
        sequelize.addModels(MODELS);
        await sequelize.sync();
        return sequelize
    }

    static async createMigrator() {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        })
        sequelize.addModels(MODELS);
        const migration: Umzug<any> = migrator(sequelize)
        await migration.up()
        return { sequelize, migration }
    }
}

