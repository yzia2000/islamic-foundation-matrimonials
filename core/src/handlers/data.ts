import { Handler } from 'express';
import { QueryResult } from 'pg';
import pool from '../db';
import { BioData } from '../types/biodata';

export const setData: Handler = async (req, res) => {
  try {
    const userId = req.body.user.id;
    const data: BioData = req.body;
    const query = 'call set_data_end($1, $2, $3, $4, $5, $6, $7)';
    await pool.query(query, [
      userId,
      JSON.stringify(data.educationHistory),
      JSON.stringify(data.employmentHistory),
      JSON.stringify(data.religion),
      data.gender,
      JSON.stringify(data.contact),
      data.description
    ]);
    res.status(201).send("Biodata updated");
  } catch (error) {
    res.status(403).send('Something went wrong..');
  }
};

export const getData: Handler = async (req, res) => {
  try {
    const userId = req.body.user.id;
    const query = 'select * from get_data($1)';
    const results: QueryResult = await pool.query(query, [userId]);
    if (results.rowCount !== 0) {
      const data = results.rows[0] as BioData;
      res.status(200).json(data);
    } else {
      res.status(204).send('No information found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong..');
  }
};
