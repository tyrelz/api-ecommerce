import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

// metodos do router na constante
const productsRouter = Router();
// instancia do controller dos produtos
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
