Drop database if exists GreenE;
create database GreenE;

use GreenE;

Create table User(
	Id INT primary key auto_increment,
    Name varchar(50) NOT NULL,
    Password varchar(100) NOT NULL,
    Garden JSON NOT NULL
);

Create table Item(
	Id INT primary key auto_increment,
    Name varchar(50) NOT NULL,
	Amount INT NOT NULL
);

CREATE TABLE inventory (
    user_id int NOT NULL, 
    item_id int NOT NULL, 
	
    FOREIGN KEY(user_id) REFERENCES User(Id),
    FOREIGN KEY(item_id) REFERENCES Item(Id)
);