require("dotenv").config();
const app = require("./src/app");
const connectTodatabase = require("./src/config/db");

// Database Connection
connectTodatabase();

// Routers
const authRouter = require("./src/routes/auth.routes");

// Root
app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// APIs
app.use("/api/auth", authRouter);

// Run Server
app.listen(3000, () => {
  console.log("Server is runnng on port 3000");
});
