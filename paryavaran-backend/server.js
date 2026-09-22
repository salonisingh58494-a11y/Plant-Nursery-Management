require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: "20mb" }));

const upload = multer({ storage: multer.memoryStorage() });

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.post("/api/leafy-chat", upload.single("image"), async (req, res) => {
  try {
    const { message } = req.body;

    let content = [
      {
        type: "text",
        text: `Your name is Leafy. You are an expert botanist. ${message}`
      }
    ];

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      content.push({
        type: "image_url",
        image_url: {
          url: `data:${req.file.mimetype};base64,${base64Image}`,
        },
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Leafy AI"
        },
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content || "No response";

    res.json({ reply });

  } catch (error) {
    console.error("Leafy Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Leafy is currently offline." });
  }
});

app.get("/", (req, res) => {
  res.send("🌿 API is running...");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});