const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    ingredients: [String],
    instructions: [String],
    cuisineType: String,
    dietaryLabels: [String],
    nutrition: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    source: { type: String, default: "AI" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
