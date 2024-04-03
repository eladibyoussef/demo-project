const nodemailer = require('nodemailer');




const sendResetPasswordEmail=(email,token)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eladibyoussef230@gmail.com',
            pass: 'zuwa zsip aaak yion'
        }
    });

    // Define email options
const mailOptions = {
    from: 'eladibyoussef230@gmail.com',
    to: `${email}`,
    subject: 'Reset password ',
    text: `here is the link from wher you can reset your password , please be aware that it wil be expired in 10 minutes:
    http://localhost:3000/user/resetpassword/${token}`
};

// Send email

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ msg: " can't send email , please try again later" });

    } else {
        console.log('Email sent:', info.response);
    }
});
}


module.exports=sendResetPasswordEmail;