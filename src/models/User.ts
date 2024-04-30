import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userid: {
      type: String,
      unique: true,
    },
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
    },
    profileImage: {
      type: String,
    },
    roles: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
