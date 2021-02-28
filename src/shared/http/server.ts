import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from './errors/AppError';
// import do metodo create connection
import '@shared/typeorm';

// inicialização do app com express
const app = express();

// cors inicialização
app.use(cors());
// json c/ express
app.use(express.json());

app.use(routes);

// middleware que recebe erro gerado pela aplicação, se a instancia do erro for da class AppError
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    // caso o erro seja do servidor e não gerado por nos
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

// configuração da porta e feedback pelo console
app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});
