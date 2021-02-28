import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  // todo service deve possui apenas 1 funcionalidade
  // metodo que vai estar sendo chamado no controller para execução
  // do serviço
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    //chamando o repositorio customizado de produtos
    const productsRepository = getCustomRepository(ProductRepository);

    // procurando um produto apartir de um nome
    const productExists = await productsRepository.findByName(name);

    // se o produto existir cria uma nova instancia do apperror
    if (productExists) {
      throw new AppError('There is already product with this name');
    }

    // preparando p criar o objeto
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
