const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require('helmet');
const connectDB = require('./config/database');
const userRoute = require('./routes/user');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
dotenv.config();

app.use('/api/v1/',userRoute);


app.get('/',(req, res)=>{
    res.json({
        message:"welcome"
    }).status(200);
})

app.listen(3000,()=>{
  connectDB();
  console.log("listening on localhost:3000");
});