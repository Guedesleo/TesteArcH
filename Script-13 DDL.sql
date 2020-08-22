create table Login (
	IdLogin Serial  Primary Key ,
	login varchar(30) unique ,
	passaword varchar(512),
	Nome varchar(80),
	Email varchar(100)
);

create table system (
	IdSystem Serial Primary key,
	SystemName varchar(50) unique ,
	Minemonic char(5) unique
);

create table Rules (
	IdRule Serial Primary Key,
	RuleName varchar(50) unique,
	IdSystem int references system(IdSystem)
);

CREATE TABLE LoginRules (
	IdRule int  REFERENCES Rules(IdRule),
	IdLogin bigint  REFERENCES Login(IdLogin),
	PRIMARY KEY(IdRule,IdLogin)
);



