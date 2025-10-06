"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { model, Schema } = require("mongoose");
const { UserRoles } = require("../utils/enums");
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
    avatarUrl: { type: String },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.USER,
    },
    bio: { type: String },
    socialLinks: {
        github: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
    },
});
const User = model("User", userSchema);
exports.default = User;
