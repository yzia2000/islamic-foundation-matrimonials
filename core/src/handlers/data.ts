import { Handler } from 'express';
import { QueryResult } from 'pg';
import pool from '../db';
import { BioData } from '../types/biodata';

export const setData: Handler = async (req, res) => {
  try {
    const data: BioData = req.body;
    const query = 'call set_data_end($1, $2, $3, $4, $5, $6)';
    await pool.query(query, [
      req.body.user.id,
      JSON.stringify(data.educationHistory),
      JSON.stringify(data.employmentHistory),
      JSON.stringify(data.religion),
      data.gender,
      data.description
    ]);
    res.status(201).send("Biodata updated");
  } catch (error) {
    res.status(403).send('Something went wrong..');
  }
};

export const getData: Handler = async (req, res) => {
  try {
    const userId = req.body.user.userId;
    const query = 'select getdata($1)';
    const results: QueryResult = await pool.query(query, [userId]);
    if (results.rowCount !== 0) {
      res.status(200).json(results.rows[0]);
    } else {
      res.status(204).send('No information found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong..');
  }
};
