const express = require('express')
const passport = require('passport');
// const jwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const  {authenticateUser} = require('./source/config/userPassport');

const adminRoute = require('./routes/adminRoute')
const userRouters = require('./routes/userRoute')



require("dotenv").config();
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const PORT= 3000
const uri = process.env.URI;
mongoose.connect(uri)
const db = mongoose.connection;


//handle events for mongoDB connection to be aware of the connection status
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB Atlas!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
//test 


app.post('/admin',async (req,res)=>{
    const {email,password} = req.body;
try{
   const admin = await Admin.findOne({email:email})
   if(!admin){
    res.status(400).json({msg:'invalid crediantials'})
   }else{
    console.log(admin);
    const passwordsMatched = await bcrypt.compare(password, admin.password);
    if(passwordsMatched){
        const payload = {id: admin.id , name: admin.name , isAdmin: admin.isAdmin};
        console.log('payload :', payload);
        console.log('secret', process.env.ADMIN_SECRET);
         jwt.sign(payload, process.env.ADMIN_SECRET, {expiresIn:3600000 }, (err,token)=>{
            res.cookie('token', token , {
                maxAge:360000
            });
            res.status(200).json({msg:'admin logged successfully '})
         })
    }else{
        res.status(500).json({msg:'invalid crediantials'})
    }
   }
        
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log('fatal error ', error);
    }
    


})

app.get('/protected',authenticateAdmin,(req,res)=>{
    res.status(201).json({msg:'you are in the admin area'})
} )

app.post('/user',async (req,res)=>{
    const {name , email , password}=req.body;
     try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password,salt);


        const newUser = new User({
            name : name ,
            email:email,
            password:hashed
            
        })
        await newUser.save();
        console.log('user created ');
        res.status(201).json({msg:'success', user : newUser})
        
     } catch (error) {
        res.status(401).json({msg:error.msg});
     }
})

app.post('/userlogin',async (req,res)=>{
    const {email,password}=req.body;
   try {
    const user= await User.findOne({email:email});
    if(user){
        const passMatch= await bcrypt.compare(password,user.password);
        if(passMatch){
            const payload = {id: user.id , name: user.name}
            // console.log(payload);
            // console.log('user secret',process.env.USER_SECRET);
            jwt.sign(payload,process.env.USER_SECRET,{expiresIn:3600000},(err,token)=>{
                // console.log(token);
                res.cookie('token',token,{
                    maxAge:3600000
                })
                res.status(200).json({msg:'user logged successfully '})

            })

        }else{
            res.status(500).json({msg:'invalid crediantials'});

        }
    }
   } catch (error) {
    res.status(500).json({msg: error.message})
    console.log('fatal error ', error);
    

   }
} )

app.get('/userprotected',authenticateUser, (req,res)=>{
    res.json({message:'you are in the user protected area '})
} )


app.use('/users', adminRoute)


app.use('/user',userRouters)


app.listen(PORT, ()=>{
     console.log(`http://localhost:${PORT}`);
})





