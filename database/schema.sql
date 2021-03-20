DROP DATABASE IF EXISTS fuelpredictor;

CREATE DATABASE fuelpredictor;

USE fuelpredictor;

CREATE TABLE userLogin (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) DEFAULT NULL,
  pwd varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE register (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) DEFAULT NULL,
  pwd varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);