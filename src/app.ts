// app.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import cors from 'cors';


const app = express();
const PORT = 3000;



async function init(){
  const server = new ApolloServer({
    typeDefs: `
    type Query{
      hello: String
      hey(name:String): String
    }
    `,
    resolvers: {
      Query:{
        hello: ()=> `Hey there this is a graphql server`,
        hey: (_,{name}:{name:String})=> `Hey there ${name}`
      }
    },
  });
  await server.start();





app.use(express.json(), cors<cors.CorsRequest>());

app.use('/graphql', expressMiddleware(server));
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