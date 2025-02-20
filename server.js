import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

//routers
import postRouter from './routers/postRouter.js';
import authRouter from './routers/authRouter.js';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev')); // log requests to the console

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body });
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/auth', authRouter);

//Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

//Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
