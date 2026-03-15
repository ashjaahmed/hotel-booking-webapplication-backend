const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');

app.use(bodyParser.json());
const PORT=8000;

// Routes
app.use('/auth', authRoutes);
app.use('/hotels', hotelRoutes);


app.listen(PORT,(req,res)=>{
    console.log(`server is listening on ${PORT}`);
})