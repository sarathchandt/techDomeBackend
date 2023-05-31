import {} from 'dotenv/config'
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path' ;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import db from './db/mongoDb.js'

import userRoutes from './routes/userRoutes.js'

const app = express()
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());

// database connection function
db.connect()

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true,  parameterLimit: 50000 })); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(
    "/public",
    express.static(path.join(__dirname, "./public"))
  );

app.use('/user',userRoutes)

 


app.listen(3033,()=>{ 
    console.log('conected:3033');
})