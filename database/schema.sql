DROP DATABASE IF EXISTS fuelpredictor;

CREATE DATABASE fuelpredictor;

USE fuelpredictor;

CREATE TABLE userInfo (
  id int NOT NULL AUTO_INCREMENT,
  fullname varchar(100) DEFAULT NULL,
  add1 varchar(100) DEFAULT NULL,
  add2 varchar(100) DEFAULT NULL,
  city varchar(100) DEFAULT NULL,
  state varchar(100) DEFAULT NULL,
  zip varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE register (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) DEFAULT NULL,
  pwd varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);