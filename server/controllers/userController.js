const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const userLogin = async (req, res, next) => {
    const {username, password} = req.body;

    try {
        User.findOne({username}).then((user, err) => {
            if (err) {
                return res.status(500).json({message: 'Internal server error'});
            }
    
            if (!user) {
                return res.status(400).json({message: 'Invalid username or password'});
            }
    
            const passworMatch = bcrypt.compare(password, user.password);

            if (!passworMatch) {
                return res.status(401).json({message: 'Invalid username or password'});
            }          
                
            const token = jwt.sign({
                id: user.userId, 
                role: user.role
            }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});            
            
            res.status(200).json({message: 'User logged in succesfully', token});
        });
    } catch(err) {
        res.status(500).json({error: 'Login failed'})
    }
};

const register = async(req, res) => {     
    const {userId, username, name, email, password, role} = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            throw err;
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                throw err;
            }

            const newUser = new User({userId, username, name, email, password: hash, role});
    
            newUser.save()
                .then((user) => {
                    const token = jwt.sign({
                        userId: user.userId, 
                        role: user.role
                    }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
                    res.status(201).json({message: 'User registered succesfully', token});
                })
                .catch((error) => {
                    res.status(500).json({error: error.message});
                });
        });
    });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'})
    }
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
    userLogin,
    register,
    getAllUsers,
    getUserById,
    deleteUser
}