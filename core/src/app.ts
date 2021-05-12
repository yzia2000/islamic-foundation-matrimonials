import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import auth from './routes/auth.route';
import data from './routes/data.route';
import swagger from './routes/swagger.route';

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use('/auth', auth);
app.use('/data', data);
app.use('/api-docs', swagger);

app.get('/', (_req, res) => {
  res.send('Welcome to ZiMS Classroom API');
});

export default app;
