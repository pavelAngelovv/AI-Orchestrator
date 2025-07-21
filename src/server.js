const express = require("express")
const OpenAI = require("openai")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.API_KEY });
app.post('/api/bedtime-story', async (req, res) => {
    try {
        const userPrompt = "" ? "give a short explanation that the user has not entered anything in the input and make it funny" : req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { "role": "user", "content": userPrompt }
            ],
        });
        res.json({ story: response.choices[0].message.content });
    } catch (err) {
        console.error("Error:", err.message);
    }
})

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
})



