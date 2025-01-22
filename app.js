require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const resourceRoutes = require("./routes/resourceRoutes");
const connectDB = require('./database/dbConnect');
const authRoutes = require("./routes/authRoutes")


const PORT = process.env.PORT || 8000
const app = express();

app.use(express.json());



// MongoDB Connection
connectDB();

// auth routes
app.use("/api/auth",authRoutes)

// all the routes
app.use('/api/resources',resourceRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to the Our Backend\n\n For Testing : \n\n For Auth routes start with : /api/auth/ \n\n For resource routes strat with /api/resources");
})

// listening to all the requests
app.listen(PORT,()=>{
    console.log(`Backend is running on http://localhost:${PORT}`);
    
})
