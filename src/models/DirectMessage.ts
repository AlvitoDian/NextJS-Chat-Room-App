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
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        role: {
          // Menambah properti role untuk menandakan peran pengguna dalam pesan
          type: String, // Nilai yang diperbolehkan: sender atau receiver
          required: true,
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
