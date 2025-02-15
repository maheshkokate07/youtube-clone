import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>
    console.log("MongoDB connected successfully")
).catch((err) => 
    console.log("MongoDB connection error: ", err)
)

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));