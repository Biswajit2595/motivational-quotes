require("dotenv").config();
const express = require("express");
const axios = require("axios");
const OpenAI=require("openai")
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors())

const apiKey = process.env.OPENAPI_SECRET_KEY;
const openAI=new OpenAI({apiKey})

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/generate", async (req, res) => {
  const { keyword,type } = req.query;
  try {
    let requestData=await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Generate a ${type} related to ${keyword}` }],
        max_tokens: 100,
    })
    res.send(requestData.choices[0].message.content);
  } catch (error) {
    console.error("Error generating content:",error);
    res.status(500).send({"error":error.message});
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
