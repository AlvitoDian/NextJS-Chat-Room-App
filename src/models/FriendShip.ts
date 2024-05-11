import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendShipSchema = new Schema(
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

const FriendShip =
  mongoose.models.FriendShip || mongoose.model("FriendShip", friendShipSchema);

export default FriendShip;
