import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendShipSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FriendShip =
  mongoose.models.FriendShip || mongoose.model("FriendShip", friendShipSchema);

export default FriendShip;
