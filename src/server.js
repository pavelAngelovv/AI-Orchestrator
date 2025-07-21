const { GoogleGenAI } = require("@google/genai");
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gemini = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function runGemini(prompt) {
    const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            thinkingConfig: {
                thinkingBudget: 0,
            },
        }
    });

    return response.text;
}

runGemini('what is google')

async function runOpenAI(prompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { "role": "user", "content": prompt }
        ],
    });
    return response.choices[0].message.content;
}

app.post('/api/agent', async (req, res) => {
    try {
        // const prompt = "" ? "give a short explanation that the user has not entered anything in the input and make it funny" : req.body.prompt;
        const { agentType, prompt } = req.body;

        let output;

        if (agentType === "openai") output = await runOpenAI(prompt);
        else if (agentType === "openai") output = await runGemini(prompt);
        else throw new Error("Unsupported Agent Type");

        res.json({ output })
    } catch (err) {
        console.error("Error:", err.message);
    }
})

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
})



