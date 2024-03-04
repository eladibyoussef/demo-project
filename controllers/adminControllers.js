const User = require('../models/user.model');


// Controller function to get all users
const getAllUsers = async (req, res) => {
    try {

        // Use the User model to find all users in the database
        const users = await User.find();


        // Send the array of users as the response
        res.send(users);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


// Controller function to update a user by ID
const UpdatUserById = async (req, res) => {
    try {

        // Use the User model to find and update a user by their ID
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        

        // Check if the user was not found
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Send the updated user as the response
        res.send(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


// Controller function to delete a user by ID
const DelelUserById =  async (req, res) => {
    try {

        // Use the User model to find and remove a user by their ID
        const user = await User.findByIdAndRemove(req.params.id);
        

        // Check if the user was not found
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
    DelelUserById
}