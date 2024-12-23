CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    userName VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR
);

CREATE TABLE posts (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    userId VARCHAR UNIQUE NOT NULL,
    postedAt VARCHAR UNIQUE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);