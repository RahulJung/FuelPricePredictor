const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const { getUserInfo, registerUser } = require("../database/db");

const port = 8080;
const app = express();

// Serve the client
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// Example of a get request
app.get("/", (req, res) => {
  res.send("Hello from the server!!!");
});

app.post("/login", (req, res) => {
  getUserInfo(req.body.userName, req.body.password, (err, data) => {
    if (err) {
      console.log("Error getting data from server");
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post("http://localhost:8080/register", (req, res) => {
  console.log("bodyyyyyyyyyyyyyyyyyy", req.body);
  registerUser(req.body.userName, req.body.password, (err, data) => {
    if (err) {
      console.log("Error posting data from server");
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Listen to port 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
