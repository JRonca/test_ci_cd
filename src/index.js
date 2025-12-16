const express = require("express");
const calculator = require("./utils/calculator");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.post("/calculate", (req, res) => {
  const { a, b, operation } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "a and b must be numbers" });
  }

  if (
    !operation ||
    !["add", "subtract", "multiply", "divide"].includes(operation)
  ) {
    return res.status(400).json({
      error: "Invalid operation. Use: add, subtract, multiply, divide",
    });
  }

  try {
    const result = calculator[operation](Number(a), Number(b));

    res.json({ result });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API example for CI/CD",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      calculate: "/calculate (POST)",
    },
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
