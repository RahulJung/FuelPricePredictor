const express = require("express");
const path = require("path");
const axios = require("axios");

const port = 8080;
const app = express();

// Serve the client
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// Example of a get request
app.get("/", (req, res) => {
  res.send("Hello from the server!!!");
});

// route to client profile
app.post("/profile", (req, res) => {
  getUserInfo(
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

// Listen to port 8080
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
