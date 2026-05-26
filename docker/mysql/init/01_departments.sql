DROP DATABASE IF EXISTS departments;
CREATE DATABASE IF NOT EXISTS departments;
USE departments;

SELECT 'CREATING DEPARTMENTS DATABASE STRUCTURE' as 'INFO';

DROP TABLE IF EXISTS departments;

/*!50503 set default_storage_engine = InnoDB */;

CREATE TABLE departments (
    dept_no     CHAR(4)         NOT NULL,
    dept_name   VARCHAR(40)     NOT NULL,
    PRIMARY KEY (dept_no),
    UNIQUE  KEY (dept_name)
);

flush /*!50503 binary */ logs;

SELECT 'LOADING departments' as 'INFO';
source load_departments.dump ;
