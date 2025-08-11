const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    // dietaryPreferences: [String], // ["vegan", "low-carb"]
    // cuisinePreferences: [String], // ["Indian", "Italian"]

    searchHistory: [
      {
        queryIngredients: [String], // user ne kya ingredients diye
        dietary: [String], // restrictions at search time
        cuisine: String, // cuisine type at search time
        recipesSuggested: [String], // sirf recipe titles store karenge
        searchedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
