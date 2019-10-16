DROP DATABASE workshop1;
CREATE DATABASE workshop1;
\c workshop1

CREATE TABLE attendees (
	id serial PRIMARY KEY,
	workshop text NOT NULL,
	attendee text NOT NULL
);

INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Ahmed Abdelali');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Ann Frank');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Ann Mulkern');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Clara Weick');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','James Archer');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Linda Park');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Lucy Smith');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Roz Billingsley');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Samantha Eggert');
INSERT INTO attendees (workshop, attendee) VALUES('React Fundamentals','Tim Smith');

GRANT SELECT, INSERT ON attendees to attendees;
GRANT USAGE on attendees_id_seq to attendees;
