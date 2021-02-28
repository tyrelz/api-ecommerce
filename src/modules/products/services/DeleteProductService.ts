import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

// Deletar Produto

interface IRequest {
  id: string;
}

class DeleteProductService {
  // todo service deve possui apenas 1 funcionalidade
  // metodo que vai estar sendo chamado no controller para execução
  // do serviço
  public async execute({ id }: IRequest): Promise<void> {
    //chamando o repositorio customizado de produtos
    const productsRepository = getCustomRepository(ProductRepository);

    // pegando apenas um produto no repository de products e salvando na variavel
    const product = await productsRepository.findOne(id);

    // se o produto n existe é criada uma nova instancia do AppError
    if (!product) {
      throw new AppError('Product not found.');
    }
    // delete do produto
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
