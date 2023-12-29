// app.ts
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import cors from 'cors';
import createApolloGraphqlServer from './graphql';



const app = express();
const PORT = 3000;



async function init() {
  app.use(express.json(), cors<cors.CorsRequest>());

  app.use('/graphql', expressMiddleware(await createApolloGraphqlServer()));
  // Routes
  app.use('/users', userRoutes);
  app.use('/content', contentRoutes);

  // Error handling middleware
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

  });
}

init()