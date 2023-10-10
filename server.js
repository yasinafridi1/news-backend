require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

const cors = require("cors");
const { default: axios } = require("axios");

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOption));

app.get("/api/category/", async (req, res) => {
  const { name } = req.query;
  let generatedData = [];
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${name}.json?api-key=${process.env.API_KEY}`
    );
    response.data.results.forEach((data) => {
      if (!data.title) {
        return;
      } else {
        generatedData = [
          ...generatedData,
          {
            tittle: data.title,
            description: data.abstract,
            imageUrl: data.multimedia[0].url,
            newUrl: data.url,
          },
        ];
      }
    });
    return res.status(201).json(generatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.send("ok");
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
