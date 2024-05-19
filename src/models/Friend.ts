import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendSchema = new Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, enum: ["pending", "accepted"], default: "pending" },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.models.Friend || mongoose.model("Friend", friendSchema);

export default Friend;
