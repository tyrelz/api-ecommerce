import express from 'express';
import cors from 'cors';
import routes from './routes';

// iniciando express na aplicação
const app = express();

// utilizando o cors
app.use(cors());

// definindo que a aplicação vai usar o padrão json
app.use(express.json());

// chamando as rotas
app.use(routes);

// metodo que vai chamar o servidor
app.listen(3333, () => {
  console.log('Server started on port 3333!! 🏆');
});
