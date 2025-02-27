import { config } from "dotenv";
config();
import express from "express";
import connectToDB from "./config/db.js";
import flashcardRoutes from "./routes/flashcard.routes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import cors from "cors";
const server = express();
server.use(cookieParser());
server.use(cors({ origin: "http://localhost:5173", credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

connectToDB();

server.use("/flashcards", flashcardRoutes);
server.use("/user", userRoutes);
server.use("/subject", subjectRoutes);
server.use(errorHandler);
const PORT = process.env.PORT || 5000;
server.listen(8080, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
