const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");



dotenv.config();
const app = express();
const port = 5000;
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

app.use(cors());
app.use(express.json());

// sim mode simulates the OpenAI and doesn't actually use it
const simMode = process.env.SIM_MODE === "true";

let client;
if (!simMode) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

app.post("/api/respond", async (req, res) => {
    try {

        const {message} = req.body;

        // Sim Mode message reply
        if (simMode) {
            return res.json({ reply: `(SIM AI) Got your message: "${message}"`});
        }

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You're simulating a helpful and polite customer support technician." },
                { role: "user", content: message },
            ],
        });

        res.json({ reply: response.choices[0].message.content });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
});


app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));