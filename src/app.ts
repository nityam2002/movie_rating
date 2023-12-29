// app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/content', contentRoutes);

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("changes in the file");
});
