const mysql = require("mysql");
const mysqlConfig = require("./config.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database");
  } else {
    console.log("Connected to the database");
  }
});

//Query for register
const registerUser = (name, password, callback) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("Error hashing password");
    }
    connection.query(
      `INSERT INTO register (username, pwd) VALUES ('${name}', '${hash}')`,
      (err, data) => {
        if (err) {
          console.log("problem posting reviews in query");
          callback(err, null);
        } else {
          console.log("Successfully posted data");
          callback(null, data);
        }
      }
    );
  });
};

// Query for log in
const getUserInfo = (username, pwd, callback) => {
  connection.query(
    "SELECT * FROM register WHERE username=?",
    [username],
    (err, data) => {
      console.log("Hola");
      if (err) {
        console.log("problem getting all reviews in query");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

const userProfile = (name, add1, add2, city, state, zip, userId, callback) => {
  connection.query(
    `INSERT INTO userInfo (fullname, add1, add2, city, st, zip, userId) VALUES ('${name}', '${add1}', '${add2}', '${city}', '${state}', '${zip}', '${userId}')`,
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

const getProfile = (userId, callback) => {
  connection.query(
    "SELECT * FROM userInfo WHERE userId=?",
    [userId],
    (err, data) => {
      if (err) {
        console.log("problem getting user profile form in query");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

const addQuote = (
  fullname,
  userAddress,
  suggestedPrice,
  actualPrice,
  date,
  gallons,
  userId,
  callback
) => {
  connection.query(
    `INSERT INTO priceHistory (fullname, userAddress, suggestedPrice, actualPrice, dated, gallons, userId) VALUES ('${fullname}','${userAddress}','${suggestedPrice}','${actualPrice}','${date}','${gallons}','${userId}')`,
    (err, data) => {
      if (err) {
        console.log("Error un addquote database");
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

const getQuote = (id, callback) => {
  connection.query(
    "SELECT * FROM priceHistory WHERE userId = ?",
    [id],
    (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    }
  );
};

module.exports = {
  getUserInfo,
  registerUser,
  userProfile,
  getProfile,
  addQuote,
  getQuote,
};
