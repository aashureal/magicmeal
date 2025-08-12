const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateRecipesWithAI({ ingredients, cuisine, dietary }) {
  // Validate input
  if (!ingredients || ingredients.trim() === "") {
    throw new Error("Ingredients are required to generate a recipe");
  }

  const prompt = `
    Create a ${cuisine || ""} recipe using ONLY the given ingredients.
    Do not add extra ingredients that are not listed.
    Ingredients: ${ingredients}.
    Dietary preference: ${dietary || "none"}.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `
        You are a professional chef AI.
        Your task is to create a new recipe based ONLY on the given inputs.
        If any key input (like ingredients) is missing, respond with:
        { "error": "Missing required input" }

        Always respond strictly in JSON format only, without extra text or explanations.

        JSON format example:
        {
          "name": "Recipe Name",
          "description": "Short description of the dish.",
          "ingredients": [
            { "item": "Ingredient Name", "quantity": "2 cups" }
          ],
          "steps": [
            "Step 1 description",
            "Step 2 description"
          ],
          "nutrition": {
            "calories": 250,
            "protein": "10g",
            "carbs": "30g",
            "fat": "8g"
          }
        }
      `,
    },
  });

  let recipe;
  let rawText =
    response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    recipe = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("Error parsing AI JSON:", rawText);
    throw new Error("AI response was not valid JSON");
  }

  return recipe;
}

module.exports = generateRecipesWithAI;
