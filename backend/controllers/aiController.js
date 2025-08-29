import { GoogleGenAI } from "@google/genai";
// import { conceptExplainPrompt } from "../utils/prompts.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const response = await ai.chat.completions.create({
      model: "google/genai",
      messages: [
        {
          role: "user",
          content: `Generate interview questions for the topic: ${topic}`,
        },
      ],
    });

    const questions = response.choices[0].message.content;
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Error generating questions", error });
  }
};

export const generateConceptExplanation = async (req, res) => {};
