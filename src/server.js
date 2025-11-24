import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  const morganModule = await import('morgan');
  const morgan = morganModule.default;
  app.use(morgan('tiny'));
}

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerDocument = yaml.load('./public/bundled.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/games', gameRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
