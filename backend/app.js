const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "https://www.techtankrvce.com",
  "https://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// MongoDB Connection with better error handling and options
const connectDB = async () => {
  try {
    // Better options for MongoDB connection
    const options = {
      serverSelectionTimeoutMS: 15000, // Timeout after 15 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes
// app.use("/api/payment", require("./routes/payment"));
app.use("/api/submit", require("./routes/submission"));
app.use("/api/registration", require("./routes/registration"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
