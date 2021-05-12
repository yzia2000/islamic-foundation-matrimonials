import { Handler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/user';
import pool from '../db';

const secret: string = process.env.JWT_SECRET ?? 'examplesecret';

export const generateToken = (user: User): string => {
  return jwt.sign(user, secret, {
    expiresIn: '1h'
  });
};

export const verifyToken: Handler = async (req, res, next) => {
  try {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  let user = jwt.verify(idToken, secret);
  req.body.user = user;
  next();
  } catch(err) {
    console.error(err);
    return res.status(500).json('Something went wrong..');
  }
};
