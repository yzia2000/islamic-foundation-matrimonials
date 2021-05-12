import express, { Router } from 'express';
import { login, signup } from '../handlers/auth';

const auth: Router = express.Router();

auth.get('/login', login);
auth.post('/signup', signup);

export default auth;
