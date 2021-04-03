DROP DATABASE IF EXISTS fuelpredictor;

CREATE DATABASE fuelpredictor;

USE fuelpredictor;

CREATE TABLE fuelForm (
  id int NOT NULL AUTO_INCREMENT,
  gallon varchar(50) DEFAULT NULL,
  address varchar(1000) DEFAULT NULL,
  date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
