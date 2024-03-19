const express = require('express')
const passport = require('passport');
const app = express();
const adminRoute = require('./routes/adminRoute')
const userRouters = require('./routes/userRoute')
const adminAuth = require('./routes/adminAuthRoute')
const productsRouter = require('./routes/productRoute');
const db = require('./source/config/database')
require("dotenv").config();


const PORT= 3000


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());




app.use('/users', adminRoute)
app.use('/user',userRouters)
app.use('/admin',adminAuth)
app.use('/products',productsRouter)

app.listen(PORT, ()=>{
     console.log(`http://localhost:${PORT}`);
})





