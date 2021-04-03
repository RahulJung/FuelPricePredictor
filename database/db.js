const mysql = require("mysql");
const mysqlConfig = require("./config.js");

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database");
  } else {
    console.log("Connected to the database");
  }
});

// Query for log in
const getUserInfo = (username, pwd, callback) => {
  connection.query(
    "SELECT * FROM reviews WHERE username=? AND pwd=?",
    [username, pwd],
    (err, data) => {
      if (err) {
        console.log("problem getting all reviews in query");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

//Query for register
const registerUser = (username, password, callback) => {
  connection.query(
    `INSERT INTO register (username, pwd) VALUES ('${username}', '${password}')`,
    (err, data) => {
      if (err) {
        console.log("problem posting reviews in query");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};


// Query for UserProfile
const userProfile = (name, add1, add2, city, state, zip, callback) => {
  connection.query(
    `INSERT INTO register (username, pwd) VALUES ('${name}', '${add1}', '${add2}', '${city}', '${state}', '${zip}')`,
    (err, data) => {
      if (err) {
        console.log("problem posting user profile form in query");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

module.exports = { getUserInfo, registerUser, userProfile };
