import { Handler, Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../db';
import Education from '../types/User';

export const setData: Handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'call setdata($1, $2, $3, $4, $5)';
    const results: QueryResult = await pool.query(query, [email]);

    if (results.rowCount !== 0) {
      const hashedPassword: string = results.rows[0].password;
      const valid = await verifyPassword(hashedPassword, password);
      if (!valid) {
        res.status(403).send('Incorrect password');
      } else {
        const user: User = results.rows[0];
        const jwtToken = generateToken(user);
        res.status(203).json(jwtToken);
      }
    } else {
      res.status(403).send("Handle doesn't exist");
    }
  } catch (error) {
    res.status(403).send('Something went wrong..');
  }
};

export const updateData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body;
    const hashedPassword: string = await hashPassword(user.password);
    const query =
      'INSERT INTO users(handle, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [
      user.handle,
      user.firstname,
      user.lastname,
      user.email,
      hashedPassword
    ]);
    res.status(200).send('User has been registered');
  } catch (error) {
    console.error(error);
    res.status(403).send('Something went wrong..');
  }
};
