const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();

const User = require("./UserSchema");
const Form = require("./FormSchema");

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());

app.get("/", (req, res) => res.send("Server"));
app.post("/register", async (req, res) => {
    const { userName, password, role } = req.body;
    let newRole = role === "admin" ? "admin" : "user";
    try {
        const user = await User.create({ userName, password, role: newRole })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.post("/login", async (req, res) => {
    const { userName, password, role } = req.body;
    if (!userName || !password) {
        res.status(500).json({ "status": "error", "msg": "username & password required" });
        return;
    }
    try {
        const user = await User.findOne({ userName, password, role })
        if (user) res.status(200).json(user);
        else res.status(500).json({ "status": "error", "msg": "Invalid credentials" });
    } catch (err) {
        res.status(500).send(err);
    }
})

app.post("/saveForm", async (req, res) => {
    const { userName, selected } = req.body;
    try {
        const form = await Form.updateOne({ userName }, { userName, selected }, { upsert: true })
        res.status(200).json(form);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get("/getForm", async (req, res) => {
    try {
        const form = await Form.find({})
        res.status(200).json(form);
    } catch (err) {
        res.status(500).send(err);
    }
})

mongoose
    .connect(process.env.MDB)
    .then(() => console.log("MDB Connected"))
    .catch((err) => console.log(err));
app.listen(process.env.PORT || 8000, () => console.log("Server Running"));
