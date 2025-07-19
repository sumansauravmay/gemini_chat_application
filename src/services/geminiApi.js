// services/geminiService.js
const axios = require("axios");

const GEMINI_API_KEY = process.env.gemini_API_KEY;

const generateGeminiContent = async (data) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      data
    );

    const textResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return textResponse;
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    throw new Error("Failed to generate content using Gemini API");
  }
};

module.exports = { generateGeminiContent };
