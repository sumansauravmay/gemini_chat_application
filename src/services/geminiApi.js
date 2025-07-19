// services/geminiService.js
const axios = require("axios");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const GEMINI_API_KEY =
  "AIzaSyC_H1z7YzxzI1A9_CW518Y_qzGebFYNNUY" || process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY not found in .env file. Please set it.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateGeminiContent = async (userMessage) => {
  const prompt = userMessage;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    // console.log("Gemini Reply:", response);
    return response;
  } catch (error) {
    // console.error("Error generating Gemini reply:", error);
    return "Sorry, something went wrong with Gemini.";
  }
};


module.exports = { generateGeminiContent };
