import { httpServer } from "./infra/api-rest/app";
import { SequelizeFactory } from "./infra/database/sequelize/factory/sequelize.factory";

async function bootstrap() {
    await SequelizeFactory.create()

    httpServer.listen(3000, () => console.log(`Is running in ${3000}`));
}
bootstrap();