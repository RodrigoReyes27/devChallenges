CREATE DATABASE TodoApp;

USE TodoApp;
BEGIN;

CREATE TABLE Activities(
    id INT PRIMARY KEY auto_increment,
    activity VARCHAR(50),
    completed BOOLEAN
);

COMMIT;