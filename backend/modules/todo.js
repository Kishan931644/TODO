const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
});

const todo = mongoose.model("todo", todoSchema);

module.exports = todo;