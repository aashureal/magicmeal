const { Router } = require("express");
const router = Router();
const generateRecipesWithAI = require("../services/ai.service");

router.post("/generate", async (req, res) => {
  try {
    const ans = await generateRecipesWithAI({
      ingredients: "Tomato, Onion, Bread, Egg",
      cuisine: "Indian",
      dietary: "gluten-free",
    });
    res.json(ans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
