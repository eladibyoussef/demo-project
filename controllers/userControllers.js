const mongoose = require('mongoose');
const User = mongoose.model('User');


//registration and login to be added by youssef


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
    deleteUserProfile
};
