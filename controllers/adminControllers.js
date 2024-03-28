const User = require('../models/user.model');
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//admin login
const adminLogin = async (req,res)=>{
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
    


}

// Controller function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


// Controller function to update a user by ID
const UpdatUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


// Controller function to delete a user by ID
const DelelUserById =  async (req, res) => {
    try {

        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports={
    getAllUsers,
    UpdatUserById,
    DelelUserById,
    adminLogin
}