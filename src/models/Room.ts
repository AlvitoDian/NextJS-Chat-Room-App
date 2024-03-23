import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a username"],
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    roomImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
