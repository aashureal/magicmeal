const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },

    // dietaryPreferences: [String], // ["vegan", "low-carb"]
    // cuisinePreferences: [String], // ["Indian", "Italian"]

    searchHistory: [
      {
        queryIngredients: [String],
        dietary: [String],
        cuisine: String,
        recipesSuggested: [String],
        searchedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
