const mongoose = require('mongoose');
const Counter = require('./counter');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {type: Number, unique: true},
    description: {type: String, required: true},
    brand: {type: String, required: false},
    color: {type: String, required: false},
    lostTime: {type: Date, default: Date.now}
});

// Auto increment the product id
productSchema.pre('save', async function(next) {
    const product = this;

    if (!product.productId) {
        const counter = await Counter.findOneAndUpdate(
            {_id: 'productId'}, 
            {$inc: {count: 1}},
            {new: true}
        );

        product.productId = counter.count;
    }

    next();
});

module.exports = mongoose.model('products', productSchema);