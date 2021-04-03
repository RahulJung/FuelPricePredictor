const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const {
  getUserInfo,
  registerUser,
  postFuelForm,
  userProfile,
} = require("../database/db");

const port = 8080;
const app = express();

// Serve the client
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// Example of a get request
app.get("/", (req, res) => {
  res.send("Hello from the server!!!");
});

// route to user log in
app.post("/login", (req, res) => {
  getUserInfo(req.body.userName, req.body.password, (err, data) => {
    if (err) {
      console.log("Error getting data from server");
      res.sendStatus(500);
    }
    if (data) {
      res.send(data);
      res.sendStatus(200);
    } else {
      res.send("Wrong Username/Password Combination");
    }
  });
});

// route to user regestration
app.post("/register", (req, res) => {
  registerUser(req.body.userName, req.body.password, (err, data) => {
    if (err) {
      console.log("Error posting data from server");
      res.sendStatus(500);
    }
    if (data) {
      res.sendStatus(200);
    } else {
      res.send("Wrong Username/Password Combination");
    }
  });
});

// route to client profile
app.post("/profile", (req, res) => {
  userProfile(
    req.body.name,
    req.body.add1,
    req.body.add2,
    req.body.city,
    re1.body.state,
    re1.body.zipcode,
    (err, data) => {
      if (err) {
        console.log("Error posting data from server");
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// route to fuel price form
app.post("/fuelForm", (req, res) => {
  postFuelForm(
    req.body.gallon,
    req.body.address,
    req.body.date,
    (err, data) => {
      if (err) {
        console.log("Error posting data from server");
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    }
  );
});

// Listen to port 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
