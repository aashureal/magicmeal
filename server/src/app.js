const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
