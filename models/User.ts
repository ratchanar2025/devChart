import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
    },

    coins: {
        type: Number,
        default: 0,
    },

    badges: {
        type: [String],
        default: [],
    },
});

const User =
    mongoose.models.User ||
    mongoose.model("User", UserSchema);

export default User;