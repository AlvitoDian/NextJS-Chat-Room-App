import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Must provide a username"],
      unique: [true, "Username already exists."],
    },
    email: {
      type: String,
      required: [true, "Must provide a email"],
      unique: [true, "Email already exists."],
    },
    password: {
      type: String,
      required: [true, "Must provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
