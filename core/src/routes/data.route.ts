import express, { Router } from 'express';
import { getData, setData, updateData } from '../handlers/data';

const data: Router = express.Router();

data.post('/', setData);
data.put('/', updateData);
data.get('/', getData);

export default data;
