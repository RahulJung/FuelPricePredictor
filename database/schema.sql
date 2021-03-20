DROP DATABASE IF EXISTS fuelpredictor;

CREATE DATABASE fuelpredictor;

USE fuelpredictor;

CREATE TABLE userLogin (
  id varchar(100) NOT NULL,
  username varchar(50) DEFAULT NULL,
  password varchar(1000) DEFAULT NULL
);

CREATE TABLE register (
  id varchar(100) NOT NULL,
  username varchar(50) DEFAULT NULL,
  password varchar(1000) DEFAULT NULL
);