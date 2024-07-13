const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db_connect");
const jwt = require("jsonwebtoken");
const todo = require("./modules/todo");
const user = require("./modules/user");
const checkLogin = require("./checkLogin");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connection();
// User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isValiduser = await user.findOne({ email: email, password: password });
        if (isValiduser) {
            const token = jwt.sign({ id: isValiduser._id }, process.env.key);
            res.json({ "msg": "success", "code": 200, "token": token });
        } else {
            res.json({ msg: "Invalid", code: 401 })
        }
    } catch (e) {
        res.json({ msg: e.toString(), code: 401 });
    }
});

// User Registration
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await user.findOne({ email: email });
        if (isEmailExist) {
            res.json({ msg: "Email already exist", code: 400 })
        } else {
            const newUser = new user({ name, email, password });
            await newUser.save();
            res.json({ "msg": "success", "code": 201 });
        }
    } catch (e) {
        res.json({ msg: e.toString(), code: 400 });
    }
});

// Get TODO LIST
app.get("/todo", checkLogin, async (req, res) => {
    try {
        const todos = await todo.find({ user: req.user.id }, { _id: 1, title: 1 });
        res.json({ msg: todos, code: 201 });
    } catch (e) {
        res.json({ msg: e.toString(), code: 401 });
    }
});

// Add TODO 
app.post("/addTodo", checkLogin, async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    try {
        const newTodo = new todo({ title, user: user.id });
        const t = await newTodo.save();
        res.json({ "todo": t, code: 201 });
    } catch (e) {
        res.json({ "msg": e, "code": 400 });
    }

});

// Update TODO LIST
app.post("/updateTodo", (req, res) => {

});

// DELETE TODO LIST
app.delete("/todo/:id", checkLogin, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await todo.findByIdAndDelete(id);

        if (result) {
            res.json({ msg: 'Todo deleted successfully', code: 200 });
        } else {
            res.json({ msg: 'Todo not found', code: 404 });
        }
    } catch (e) {
        res.json({ msg: e.toString(), code: 401 });
    }
});

// Start The Server
app.listen(3000, () => {
    console.log("Server Started at 3000");
})