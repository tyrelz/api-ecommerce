import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

// Responsavel por listar todos os produtos

class ListProductService {
  // todo service deve possui apenas 1 funcionalidade
  // metodo que vai estar sendo chamado no controller para execução
  // do serviço
  public async execute(): Promise<Product[]> {
    //chamando o repositorio customizado de produtos
    const productsRepository = getCustomRepository(ProductRepository);

    // pegando tudo que existe no repository de products e salvando na variavel
    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
