import mongoose from "mongoose";

const Schema = mongoose.Schema;

const directMessageSchema = new Schema(
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
    messages: [
      {
        content: {
          type: String,
        },
        contentType: {
          type: String,
          default: "text",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        role: {
          type: String,
        },
        fileUrl: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DirectMessage =
  mongoose.models.DirectMessage ||
  mongoose.model("DirectMessage", directMessageSchema);

export default DirectMessage;
