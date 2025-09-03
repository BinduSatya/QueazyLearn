import { GoogleGenAI } from "@google/genai";

import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

export const generateInterviewQuestions = async (req, res) => {
  console.log("came to backend for generating Interview Questions");

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
  });
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions = 10,
    } = req.body;
    if (!topicsToFocus || !role || !experience || !numberOfQuestions) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating questions", error: error.message });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
    });

    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required rad" });
    }
    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const response = await model.generateContent(prompt);

    console.log("response is:", response);
    let rawText = response.text;

    console.log("rawText:", rawText);

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error generating concept explanation",
      error: error.message,
    });
  }
};
