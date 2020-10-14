import { Router } from 'express';
import itemsRouter from './items.routes';
import locationsRouter from './locations.routes'

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/locations', locationsRouter);

export default routes;