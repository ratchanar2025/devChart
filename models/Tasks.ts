import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo",
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },

    progress: {
        type: Number,
        default: 0,
    },

    rewardCoins: {
        type: Number,
        default: 10,
    },

    createdBy: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },

    assignedTo: {
        type: String,
        default: "",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;