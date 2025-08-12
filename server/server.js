require("dotenv").config();
const app = require("./src/app");
const connectTodatabase = require("./src/config/db");

// Database Connection
connectTodatabase();

// Routers
const authRouter = require("./src/routes/auth.routes");
const recipeRouter = require("./src/routes/recipe.routes");

// Root
app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// APIs
app.use("/api/auth", authRouter);
app.use("/api/recipe", recipeRouter);

// Run Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
