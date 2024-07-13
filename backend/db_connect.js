const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/TODO");
        console.log("Connected  ~~  !!");
    } catch (e) {
        console.log("Connection error", e);
    }
}
module.exports = connect;

