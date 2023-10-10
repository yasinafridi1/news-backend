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

//  {
//           "section": "arts",
//           "subsection": "dance",
//           "title": "Balanchine Blue: A Clean Field for Dance That Says ‘City Ballet’",
//           "abstract": "The Empire State Building honors New York City Ballet’s 75th anniversary by lighting up in blue, favored by George Balanchine as a backdrop.",
//           "url": "https://www.nytimes.com/2023/10/10/arts/dance/balanchine-blue-empire-state-building.html",
//           "uri": "nyt://article/945c2b5c-2615-5704-91cb-b6745086fd57",
//           "byline": "By Roslyn Sulcas",
//           "item_type": "Article",
//           "updated_date": "2023-10-10T12:47:46-04:00",
//           "created_date": "2023-10-10T12:47:46-04:00",
//           "published_date": "2023-10-10T12:47:46-04:00",
//           "material_type_facet": "",
//           "kicker": "",
//           "des_facet": [
//               "Dancing"
//           ],
//           "org_facet": [
//               "New York City Ballet",
//               "Empire State Building (Manhattan, NY)"
//           ],
//           "per_facet": [
//               "Balanchine, George"
//           ],
//           "geo_facet": [],
//           "multimedia": [
//               {
//                   "url": "https://static01.nyt.com/images/2023/10/11/multimedia/10balanchine-blue-01-vlpw/10balanchine-blue-01-vlpw-superJumbo.jpg",
//                   "format": "Super Jumbo",
//                   "height": 1583,
//                   "width": 2048,
//                   "type": "image",
//                   "subtype": "photo",
//                   "caption": "Sara Mearns (on floor) and Emilie Gerrity in a 2021 performance of George Balanchine’s “Serenade.” “You feel like you are being hugged by the environment,” Mearns said of the ballet’s lighting.",
//                   "copyright": "Erin Baiano"
//               },
//               {
//                   "url": "https://static01.nyt.com/images/2023/10/11/multimedia/10balanchine-blue-01-vlpw/10balanchine-blue-01-vlpw-threeByTwoSmallAt2X.jpg",
//                   "format": "threeByTwoSmallAt2X",
//                   "height": 400,
//                   "width": 600,
//                   "type": "image",
//                   "subtype": "photo",
//                   "caption": "Sara Mearns (on floor) and Emilie Gerrity in a 2021 performance of George Balanchine’s “Serenade.” “You feel like you are being hugged by the environment,” Mearns said of the ballet’s lighting.",
//                   "copyright": "Erin Baiano"
//               },
//               {
//                   "url": "https://static01.nyt.com/images/2023/10/11/multimedia/10balanchine-blue-01-vlpw/10balanchine-blue-01-vlpw-thumbLarge.jpg",
//                   "format": "Large Thumbnail",
//                   "height": 150,
//                   "width": 150,
//                   "type": "image",
//                   "subtype": "photo",
//                   "caption": "Sara Mearns (on floor) and Emilie Gerrity in a 2021 performance of George Balanchine’s “Serenade.” “You feel like you are being hugged by the environment,” Mearns said of the ballet’s lighting.",
//                   "copyright": "Erin Baiano"
//               }
//           ],
//           "short_url": ""
//       },
