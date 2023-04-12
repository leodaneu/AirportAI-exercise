const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'})
    }
};

const createUser = async(req, res) => {    
    const newUser = new User(req.body);
    
    newUser.save()
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        });
};

const getUserById = async(req, res) => {
    const userId = req.params.userId;
    
    try {
        const user = await User.findOne({userId: userId});

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

const deleteUser = async(req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json({mesage: 'User deleted succesfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}