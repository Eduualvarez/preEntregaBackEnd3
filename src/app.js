import express from 'express';
import  urlencoded from "express" 
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fs from "fs";
import https from "https"
mongoose.set('strictQuery', true); 

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'
const app = express();
const PORT = process.env.PORT||8080;
 mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


app.use('/api/mocks', mocksRouter)
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Servidor HTTPS corriendo en: https://localhost:${PORT}`);
});