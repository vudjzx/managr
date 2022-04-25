import express from 'express';
import * as dotenv from 'dotenv';
import connectDataBase from './config/db';
import userRouter from './routes/userRoutes';
import projectRouter from './routes/projectRoutes';
import taskRouter from './routes/taskRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
connectDataBase();

// CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin ?? '')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// import routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
