Drop database if exists GreenE;
create database GreenE CHARSET 'utf8';
use GreenE;

Create table Users(
	id INT primary key auto_increment,
    username varchar(50) NOT NULL,
    score LONG NOT NULL,
    password varchar(100) NOT NULL
);

CREATE TABLE Garden (
	id int NOT NULL PRIMARY KEY auto_increment,
    userId INT NOT NULL,

    FOREIGN key (userId) references Users(id)
);

CREATE TABLE Field (
    userId INT NOT NULL,
	x INT NOT NULL,
    y INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    startTime LONG NOT NULL,
    time INT NOT NULL,

    foreign key (userId) references Users(id)
);

CREATE TABLE Items (
    name varchar(50) NOT NULL,
	amount INT NOT NULL,
    maxAmount INT NOT NULL,
	userId INT NOT NULL,

    foreign key(userId) references Users(id)
);


