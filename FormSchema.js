const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true,
            required: [true, "userName Required"],
        },
        selected: {
            type: String,
            trim: true,
            required: [true, "selected Required"],
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Form", FormSchema);
