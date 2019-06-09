Drop database if exists GreenE;
create database GreenE CHARSET 'utf8';
use GreenE;

Create table Users(
	id INT primary key auto_increment,
    username varchar(50) NOT NULL,
    password varchar(100) NOT NULL
);

CREATE TABLE Garden (
	id int NOT NULL PRIMARY KEY auto_increment,
    userId INT NOT NULL,

    FOREIGN key (userId) references Users(id)
);

CREATE TABLE Field (
    gardenId INT NOT NULL,
	x INT NOT NULL,
    y INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    startTime LONG NOT NULL,
    time INT NOT NULL,

    primary key (x, y),
    foreign key (gardenId) references Garden(id)
);

# user 1

Insert into Users(username, password) values ('Goshe', '123asd');

Insert into Garden (userId) values (1);

# user 2

Insert into Users(username, password) values ('Mincho', '1234');


