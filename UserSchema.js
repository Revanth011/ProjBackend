const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            trim: true,
            minlength: [4, 'required more than 4 characters'],
            required: [true, "userName Required"],
        },
        password: {
            type: String,
            trim: true,
            minlength: [4, 'required more than 4 characters'],
            required: [true, "password Required"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
