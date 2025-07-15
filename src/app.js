import express from 'express';
import  urlencoded from "express" 
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions.js';


import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './config/swaggerOptions.js';

 const app = express();
 
const specs = swaggerJsdoc(options);

console.log(specs.paths)
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));



app.use('/api/mocks', mocksRouter)
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(specs));


export default app;