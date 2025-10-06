import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./routes/authRoute";
import { dbConfig } from "./configs/dbConfig";

config();
dbConfig();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running on port " + PORT));
