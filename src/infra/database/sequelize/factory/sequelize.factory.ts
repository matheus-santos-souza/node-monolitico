import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "src/modules/client-adm/repository/client.model";
import { ProductModel } from "src/modules/product-adm/repository/product.model";

export class SequelizeFactory {
    static async create() {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true
            }
        })
        
        sequelize.addModels([ProductModel, ClientModel]);
        await sequelize.sync();
        return sequelize
    }
}

