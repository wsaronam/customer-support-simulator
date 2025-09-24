import OpenAI from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/respond", async (req, res) => {
    try {
        const {message} = req.body;

        const response = await client.chat.completions.create({
            messages: [
                {role: "system", content: "You're simulating a helpful and polite customer support technician."}
            ],
        });
    }
    catch (err) {
        console.error(error);
    }
});


app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));