const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require('helmet');
const connectDB = require('./config/database');
const userRoute = require('./routes/user');
const transactionRoute = require('./routes/transaction');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use('/api/v1/',userRoute);
app.use('/api/v1/',transactionRoute);



app.listen(3000,()=>{
  connectDB();
  console.log("listening on localhost:3000");
});

