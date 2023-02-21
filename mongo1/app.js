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

    let page = parseInt(req.query.page) || 1;
    let docsPerPage = 2;
    let skip = docsPerPage * (page - 1);
    let limit = docsPerPage;

    if (req.query.keyword) {
      match.$or = [
        { author: new RegExp(req.query.keyword, "i") },
        { title: new RegExp(req.query.keyword, "i") },
      ];
    }

    if (req.query.year) {
      match.year = parseInt(req.query.year);
    }

    const response = await Book.aggregate([
      { $match: match },
      {
        $facet: {
          edges: [{ $skip: skip }, { $limit: limit }],
          pageInfo: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
      {
        $project: {
          _id: 0,
          docs: "$edges",
          totalDocs: { $first: "$pageInfo.count" },
          page: `${page}`,
        },
      },
      // { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    res.send(response[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(4000, () => {
  console.log(`Server Running on 4000, `);
});
