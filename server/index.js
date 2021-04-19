const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const bodyParser = require("body-parser");
const {
  getUserInfo,
  registerUser,
  postFuelForm,
  userProfile,
  getProfile,
} = require("../database/db");
const { createSecretKey } = require("crypto");

const port = 8080;
const app = express();

// Serve the client
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// Example of a get request
// app.get("/", (req, res) => {
//   res.send("Hello from the server!!!");
// });

// route to user log in
app.post("/login", (req, res) => {
  getUserInfo(req.body.name, req.body.password, (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].pwd, (err, response) => {
        if (response) {
          res.send({ data: data[0].userId, logged: true });
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
    req.body.address1,
    req.body.address2,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.userId,
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

app.get("/userInfo/:id", (req, res) => {
  console.log("triggered", req.params.id);
  getProfile(req.params.id, (err, data) => {
    if (err) {
      console.log("Error getting user profile in server");
    } else {
      console.log(data);
      res.send(data);
    }
  });
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
