import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

// Responsavel por retornar apenas um produto em especifico

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  // todo service deve possui apenas 1 funcionalidade
  // metodo que vai estar sendo chamado no controller para execução
  // do serviço
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    //chamando o repositorio customizado de produtos
    const productsRepository = getCustomRepository(ProductRepository);

    // pegando apenas um produto no repository de products e salvando na variavel
    const product = await productsRepository.findOne(id);

    // se o produto n existe é criada uma nova instancia do AppError
    if (!product) {
      throw new AppError('Product not found.');
    }
    // procurando um produto apartir de um nome
    const productExists = await productsRepository.findByName(name);

    // se o produto existir cria uma nova instancia do apperror
    if (productExists) {
      throw new AppError('There is already product with this name');
    }

    //atualização do product
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    // salvando product
    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
