const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const Admin = require('../../models/admin.model')
const {cookieExtractor} = require('../../utilities/passportUtilities')
//options object will be filled later in this page , in our case we want the token to be extracted from the cookie , I stored  the secret key in .env file 
const options = {};
require('dotenv').config();

//fill the options object that will be used by the passport to authenticate the user.
options.jwtFromRequest = cookieExtractor;
options.secretOrKey = process.env.ADMIN_SECRET;

//I found it better to distunguish between admins authentication and user authentication , because it will be easier to give the right access and authorization to admin later in the app
//admin authentication , check if the admin exists and also if isAdmin prperty is true 
passport.use('admin-jwt', new JwtStrategy(options, async (payload, done) => {
    try {
        const admin = await Admin.findById(payload.id)
        if(admin&&admin.isAdmin){
            return done(null,admin);
        }else{
            return done(null,false)
        }
        
    } catch (error) {
        console.log('error catched', error.message);
    }
   
}));




//latEr in different routes it will be easier know to authenticate regular users and to give admin authorization to certain routes
exports.authenticateAdmin = passport.authenticate('admin-jwt', { session: false });
