import express, { Router } from 'express';
import { getData, setData } from '../handlers/data';
import { verifyToken } from '../utils/jwtAuth';

const data: Router = express.Router();

data.post('/', verifyToken, setData);
data.put('/', verifyToken, setData);
data.get('/', verifyToken, getData);

export default data;
