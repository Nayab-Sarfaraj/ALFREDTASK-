import cron from "node-cron";
import Flashcard from "../models/flashcard.model.js";
const flashCardScheduler = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const flashcards = await Flashcard.find({ nextReview: { $lt: today } });

    if (flashcards.length > 0) {
      flashcards.forEach(async function (card) {
        card.nextReview = today;
        await card.save();
      });
    }
  } catch (error) {
    console.log("error while updating the review date");
    console.log(error.message);
  }
};

cron.schedule("*/20 * * * * * ", flashCardScheduler);
