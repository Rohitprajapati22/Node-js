const mongoose = require('mongoose')

const connectdb = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://rohit3891:rohit389123@cluster0.bhpkc.mongodb.net/loging-cookie`);
        console.log("Database is Connected Successfully..!");

    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports =connectdb;