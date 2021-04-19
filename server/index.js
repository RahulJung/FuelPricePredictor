const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
  getUserInfo(req.body.name, req.body.password, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].pwd, (err, response) => {
        if (response) {
          res.send({ loggedIN: true, data: data });
        } else {
          res.send({ message: "Wrong username or password" });
        }
      });
    } else {
      res.send({ message: "User does not exist" });
    }
  });
});

// route to user regestration
app.post("/register", (req, res) => {
  let name = req.body.name;
  let password = req.body.password;

  registerUser(name, password, (err, data) => {
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
