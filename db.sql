Drop database if exists GreenE;
create database GreenE CHARSET 'utf8';
use GreenE;

Create table Users(
	id INT primary key auto_increment,
    name varchar(50) NOT NULL,
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

Insert into Users(name, password) values ('Goshe', '123asd');

Insert into Garden (userId) values (1);

Insert into Field (gardenId, x, y, name, startTime, time) values (1, 0, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 1, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 2, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 4, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 5, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 6, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 7, 0, 'empty', 1000, 10);
Insert into Field (gardenId, x, y, name, startTime, time) values (1, 8, 0, 'empty', 1000, 10);

# user 2

Insert into Users(name, password) values ('Mincho', '1234');


Update Field SET
	name = 'zele',
	startTime = 1000,
	time = 10
WHERE Field.x = 2 AND Field.y = 0 AND Field.gardenId = 1;

