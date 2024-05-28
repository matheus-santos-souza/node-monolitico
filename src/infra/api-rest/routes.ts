
import { Router } from 'express';
import { ProductController } from './controllers/product/product.controller';
import { ClientController } from './controllers/client/client.controller';

const routes = Router();

routes.post('/product', new ProductController().create);

routes.post('/client', new ClientController().create);

export { routes };