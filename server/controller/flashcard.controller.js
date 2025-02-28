import Flashcard from "../models/flashcard.model.js";
import Errorhandler from "../utils/errorHandler.js";

export const createFlashCard = async (req, res, next) => {
  try {
    const { question, answer, user } = req.body;
    if (!question || !answer)
      return next(new Errorhandler("All fields are required", 401));
    const flashcard = await Flashcard.create({
      question,
      answer,
      user,
    });
    return res.status(200).json({ success: true, flashcard });
  } catch (error) {
    return next(new Errorhandler("Something went wrong", 500));
  }
};

export const getAllFlashCard = async (req, res, next) => {
  try {
    const { userID } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const flashcards = await Flashcard.find({
      $and: [{ nextReview: { $gte: today, $lt: tomorrow } }, { user: userID }],
    });

    return res.json({ success: true, flashcards });
  } catch (error) {
    return next(new Errorhandler("Something went wrong", 500));
  }
};
export const deleteFlashCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return next(new Errorhandler("Flash card not found", 401));
    await Flashcard.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted the flash card" });
  } catch (error) {
    return next(new Errorhandler("Something went wrong", 500));
  }
};

export const updateFlashCard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return next(new Errorhandler("Flash card not found", 401));
    const { isCorrect } = req.body;
    if (isCorrect) {
      flashcard.box = Math.min(flashcard.box + 1, 5);
    } else {
      flashcard.box = 1;
    }
    flashcard.nextReview = new Date(
      Date.now() + flashcard.box * 24 * 60 * 60 * 1000
    );
    await flashcard.save();
    return res.status(200).json({ success: true, flashcard });
  } catch (error) {
    return next(new Errorhandler("Something went wrong", 500));
  }
};
