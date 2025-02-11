const mongoose = require('mongoose');

const addcartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },

});

const addcart = mongoose.model('addcart', addcartSchema);
module.exports = addcart;
