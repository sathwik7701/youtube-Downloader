const express = require("express");
const dbConnect = require("./db");
const Book = require("./Book.model");

const app = express();

//Enviroment Variables
require("dotenv").config();
const DB_URI = process.env.URI;

//Databse connect function
dbConnect(DB_URI);

//Routes
app.get("/list", async (req, res) => {
  try {
    let match = {};
    // if (req.query.keyword) {
    //   match.author = new RegExp(req.query.keyword, "i");
    // }

    if (req.query.keyword) {
      match.$or = [
        { author: new RegExp(req.query.keyword, "i") },
        { title: new RegExp(req.query.keyword, "i") },
      ];
    }

    if (req.query.year) {
      match.year = parseInt(req.query.year);
    }

    console.log(match);

    const response = await Book.aggregate([{ $match: match }]);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(4000, () => {
  console.log(`Server Running on 4000, `);
});
