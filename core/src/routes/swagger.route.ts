import express, { Router } from "express";
import * as swaggerUi from 'swagger-ui-express';
import config from '../openapi3-config.json';

const swagger: Router = express.Router()
swagger.use('/', swaggerUi.serve);
swagger.get('/', swaggerUi.setup(config));

export default swagger;
