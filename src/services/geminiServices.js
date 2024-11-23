import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescriptionOfGemini(imageBuff) {
  const prompt = "Generate desciption in English for the next image";

  try {
    const image = {
      inlineData: {
        data: imageBuff.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text unavailable.";
  } catch (error) {
    console.error("Error to obtain alt-text:", error.message, error);
    throw new Error("Error to obtain alt-text of Gemini.");
  }
}