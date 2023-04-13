const { uniqueId } = require('lodash');
const mongoose = require('mongoose');
const Counter = require('./counter');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {type: Number, unique: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['agent', 'passenger'], default: 'passenger'}
});

// Auto increment the user id
userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.userId) {
        const counter = await Counter.findOneAndUpdate(
            {_id: 'userId'}, 
            {$inc: {count: 1}},
            {new: true}
        );

        user.userId = counter.count;
    }

    next();
});

module.exports = mongoose.model('users', userSchema);