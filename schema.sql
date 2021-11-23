DROP DATABASE IF EXISTS multiformcheckout;

CREATE DATABASE multiformcheckout;

USE multiformcheckout;

CREATE TABLE customers(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(50),
  addressLine1 VARCHAR(50),
  addressLine2 VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(50),
  zipcode VARCHAR(50),
  phoneNumber VARCHAR(50),
  creditCardNumber VARCHAR(50),
  expirationDate VARCHAR(50),
  cvv VARCHAR(50),
  billingZipCode VARCHAR(50),
  PRIMARY KEY (id)
);