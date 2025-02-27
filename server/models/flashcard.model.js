import mongoose, { mongo } from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    box: { type: Number, default: 1 },
    // subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    nextReview: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);
export default Flashcard;
