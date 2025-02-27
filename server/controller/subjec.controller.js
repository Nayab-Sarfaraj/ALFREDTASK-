import Flashcard from "../models/flashcard.model.js";
import Subject from "../models/subject.model.js";
import Errorhandler from "../utils/errorHandler.js";

export const createSubject = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return next(new Errorhandler("Title is required", 401));
    const subject = await Subject.create({ title });
    return res.status(200).json({ success: true, subject });
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};

export const getAllSubject = async (req, res, next) => {
  try {
    console.log("here");
    const subjects = await Subject.find();
    return res.status(200).json({ success: true, subjects });
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};
export const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.body;
    const flashcard = await Flashcard.find({ subject: id });
    if (flashcard?.length !== 0) {
      flashcard.forEach(async function (card) {
        await Flashcard.findByIdAndDelete(card._id);
      });
    }

    await Subject.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Deleted the subject" });
  } catch (error) {
    console.log(error.message);
    return next(new Errorhandler("Something went wrong", 500));
  }
};
