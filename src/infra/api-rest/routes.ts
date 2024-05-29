
import { Router } from 'express';
import { ProductController } from './controllers/product/product.controller';
import { ClientController } from './controllers/client/client.controller';
import { CheckoutController } from './controllers/checkout/checkout.controller';

const routes = Router();

routes.post('/product', new ProductController().create);

routes.post('/client', new ClientController().create);

routes.post('/checkout', new CheckoutController().create);

export { routes };