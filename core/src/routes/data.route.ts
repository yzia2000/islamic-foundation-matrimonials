import express, { Router } from 'express';
import { login, signup } from '../handlers/data';

const data: Router = express.Router();

data.post('/', login);
data.put('/', signup);

export default data;
