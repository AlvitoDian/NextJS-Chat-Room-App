import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a username"],
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    roomImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;
