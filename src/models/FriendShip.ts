import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendshipSchema = new Schema(
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

const Friendship =
  mongoose.models.Friendship || mongoose.model("Friendship", friendshipSchema);

export default Friendship;
