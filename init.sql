CREATE TABLE avatars (
  ID SERIAL PRIMARY KEY,
  avatar SMALLINT NOT NULL,
  skinTone VARCHAR(40) NOT NULL,
  jawLine VARCHAR(40) NOT NULL,
  nose VARCHAR(40) NOT NULL,
  beard VARCHAR(40),
  hairColour VARCHAR(40) NOT NULL,
  hairLength VARCHAR(40) NOT NULL,
  hairLine VARCHAR(40) NOT NULL,
  eyeColour VARCHAR(40) NOT NULL,
  eyeShape VARCHAR(40) NOT NULL,
  eyeBrows VARCHAR(40) NOT NULL,
  lips VARCHAR(40) NOT NULL,
  participantAge VARCHAR(40) NOT NULL,
  participantOccupation VARCHAR(40) NOT NULL,
  participantLocation VARCHAR(40) NOT NULL,
  workshop BOOL DEFAULT false,
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO avatars (avatar, skinTone, jawLine, nose, beard, hairColour, hairLength, hairLine, eyeColour, eyeShape, eyeBrows, lips, participantAge, participantOccupation, participantLocation, workshop)
VALUES  (1, 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'n', 'o', 'p', 'q', 'r' );
