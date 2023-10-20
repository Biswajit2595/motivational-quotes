require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const apiKey = process.env.OPENAPI_SECRET_KEY;

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/quotes", async (req, res) => {
  const { keyword } = req.query;
  try {
    const apiEndpoint =
      "https://api.openai.com/v1/engines/text-davinci-002/completions";

    const requestData = {
      prompt: `Generate a motivation quotes related to ${keyword}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    };

    const response = await axios.post(apiEndpoint, requestData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json", // Add this line
      },
    });
    const generatedContent = response.data.choices[0].text;

    res.send(generatedContent);
  } catch (error) {
    console.error("Error generating content:", error.response.data);
    res.status(500).send({"error":error.response.data});
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
