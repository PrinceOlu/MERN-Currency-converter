require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const Router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiter configuration to prevent abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(apiLimiter);

// Routes
app.use("/api", Router); // All routes with the "/api" prefix will use `Router`

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
