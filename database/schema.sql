DROP DATABASE IF EXISTS fuelpredictor;

CREATE DATABASE fuelpredictor;

USE fuelpredictor;


CREATE TABLE register (
  userId int NOT NULL AUTO_INCREMENT,
  username varchar(50) DEFAULT NULL,
  pwd varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`userId`)
);

CREATE TABLE userInfo (
  infoId int NOT NULL AUTO_INCREMENT,
  fullname varchar(100) DEFAULT NULL,
  add1 varchar(100) DEFAULT NULL,
  add2 varchar(100) DEFAULT NULL,
  city varchar(100) DEFAULT NULL,
  st varchar(100) DEFAULT NULL,
  zip varchar(100) DEFAULT NULL,
  userId int,
  PRIMARY KEY (`infoId`),
  FOREIGN KEY (`userId`) REFERENCES register(`userId`)
);

CREATE TABLE priceHistory (
  infoId int NOT NULL AUTO_INCREMENT,
  fullname varchar(100) DEFAULT NULL,
  userAddress varchar(5000) NOT NULL,
  suggestedPrice DECIMAL(4,2) NOT NULL,
  actualPrice DECIMAL(4,2) NOT NULL,
  dated varchar(100) NOT NULL,
  gallons DECIMAL(4,2) NOT NULL,
  userId int,
  PRIMARY KEY (`infoId`),
  FOREIGN KEY (`userId`) REFERENCES register(`userId`)
);
