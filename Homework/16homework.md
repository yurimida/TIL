# 16homework



CREATE TABLE friends (
id INTEGER,
name TEXT,
location TEXT);
INSERT INTO friends (id, name, location)
VALUES
(1, 'Justin', 'Seoul'),
(2, 'Simon', 'New York'),
(3, 'Chang', 'Las Vegas'),
(4, 'John', 'Sydney');
ALTER TABLE friends
ADD COLUMN married INTEGER;
UPDATE friends SET married=1  WHERE id=1;
UPDATE friends SET married=0 WHERE id=2;
UPDATE friends SET married=0 WHERE id=3;
UPDATE friends SET married=1 WHERE id=4;
DELETE FROMS friends WHERE married=0;
DROP TABLE friends;