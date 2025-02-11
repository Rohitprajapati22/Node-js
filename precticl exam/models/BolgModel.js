const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
