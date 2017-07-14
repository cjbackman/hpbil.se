CREATE TABLE users (
	username VARCHAR(64),
	password VARCHAR(64),
	UNIQUE (username)
);

CREATE TABLE cars (
	id INTEGER NOT NULL AUTO_INCREMENT,
	brand VARCHAR(128),
	model VARCHAR(128),
	year YEAR,
	milage INTEGER,
	color VARCHAR (64),
	price FLOAT,
	misc VARCHAR(1024),
	deleted TINYINT(1) DEFAULT 0,
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	edited_on TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE TABLE images (
    id INTEGER NOT NULL AUTO_INCREMENT,
    car_id int NOT NULL,
    filename VARCHAR(128),
    PRIMARY KEY (id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

# Test data

insert into users (username, password) values ('hpbil', 'DKuDz%2a');

insert into cars (brand, model, year, milage, color, price, misc)
	values ('Volvo', 'XC90', 2010, 1000, 'Röd', 10, 'En superbild');

insert into cars (brand, model, year, milage, color, price, misc)
	values ('Ford', 'T', 2009, 1000, 'Grön', 15, 'Halloj');

insert into cars (brand, model, year, milage, color, price, misc)
	values ('Pegeaut', 'P', 2010, 200, 'Lila', 5, 'Hmmm');

insert into cars (brand, model, year, milage, color, price)
	values ('Ferrari', 'wow', 2010, 1000, 'Orange', 100);