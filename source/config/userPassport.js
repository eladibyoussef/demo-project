const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user.model');
//options object will be filled later in this page , in our case we want the token to be extracted from the header as a bearer token , I stored  the secret key in .env file 
const options = {};
require('dotenv').config();

//fill the options object that will be used by the passport to authenticate the user.
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.USER_SECRET;


// regular user authentication
passport.use('user-jwt', new JwtStrategy(options, async (payload, done) => {
    console.log(payload);
    try {
        const user = await User.findById(payload.id)
        // console.log('user inside jwt strategy', user);

        if(user){
            return done(null,user);
        }else{
            return done(null,false)
        }
        
    } catch (error) {
        console.log('error catched', error.message);
    }
   
}));



//latEr in different routes it will be easier know to authenticate regular users and to give admin authorization to certain routes
exports.authenticateUser = passport.authenticate('user-jwt', { session: false });