import express from 'express'
import http from 'http';
import { routes } from './routes'

const app  = express();
const httpServer = http.createServer(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

export { httpServer };