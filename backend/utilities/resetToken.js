
const crypto= require('crypto')


const generateToken = ()=>{
    const token = crypto.randomBytes(32).toString('hex');;
    console.log('reset token :',token);
    return token;


}




 module.exports=generateToken