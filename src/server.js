import mongoose from "mongoose"
import fs from "fs";
import https from "https"
mongoose.set('strictQuery', true); 
import app from "./app.js";


const PORT = process.env.PORT||8080;


if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('✅ Mongo conectado'))
    .catch(err => console.error('❌ Error Mongo:', err));
}

const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Servidor HTTPS corriendo en: https://localhost:${PORT}`);
});