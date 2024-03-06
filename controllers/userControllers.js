const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




//registration and login to be added by youssef
const registerUser = async (req,res)=>{
    const {name , email , password}=req.body;
     try {
        const user = await User.findOne({email:email})
        if(!user){
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

        }else{
            res.status(500).json({message:'please try other credentials'})
        }
    
        
     } catch (error) {
        res.status(401).json({msg:error.msg});
     }
}

const loginUser= async (req,res)=>{
    const {email,password}=req.body;
   try {
    const user= await User.findOne({email:email});
    if(!user){
      
            res.status(500).json({msg:'invalid crediantials'});

        }else{
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

        }
    }
   } catch (error) {
    res.status(500).json({msg: error.message})
    console.log('fatal error ', error);
    

   }
}


// Get user profile
async function getUserProfile(req, res) {
    const { email } = req.body;
try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
} catch (error) {
    res.status(500).json({ message: error.message });
}

};

// Update user profile
async function updateUserProfile(req, res) {
    const { email, name } = req.body;
    const id = req.params.id
    console.log(id);
    try {
        const user = await User.findOneAndUpdate({ _id: id }, { email: email, name: name});
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user profile
async function deleteUserProfile(req, res) {
    const { email, name } = req.body;
    const id = req.params.id
    try {
        const user = await User.findOneAndDelete({ _id: id},{ email: email, name: name });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    registerUser,
    loginUser
};
