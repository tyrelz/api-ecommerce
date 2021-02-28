import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  // listar todos os produtos
  public async index(request: Request, response: Response): Promise<Response> {
    //instanciando a classe de listar produtos
    const listProducts = new ListProductService();

    const products = await listProducts.execute();
    // resposta em json dos products
    return response.json(products);
  }
  // listar produto especifico
  public async show(request: Request, response: Response): Promise<Response> {
    // id para o sistema saber qual produto o usuario quer listar
    const { id } = request.params;

    const ShowProduct = new ShowProductService();

    const product = await ShowProduct.execute({ id });

    return response.json(product);
  }

  // criar produto
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
  // atualizar produto
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    // necessario o id pq o usuario passa para saber qual produto quer atualizar
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
  // deletar produto
  public async delete(request: Request, response: Response): Promise<Response> {
    // necessario o id pq o usuario passa para saber qual produto quer deletar
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
