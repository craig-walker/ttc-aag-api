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
  hairTexture VARCHAR(40) NOT NULL,
  eyeColour VARCHAR(40) NOT NULL,
  eyeShape VARCHAR(40) NOT NULL,
  eyeBrows VARCHAR(40) NOT NULL,
  cheek VARCHAR(40) NOT NULL,
  lips VARCHAR(40) NOT NULL,
  participantAge VARCHAR(40) NOT NULL,
  participantOccupation VARCHAR(40) NOT NULL,
  participantLocation VARCHAR(40) NOT NULL,
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO avatars (avatar, skinTone, jawLine, nose, beard, hairColour, hairLength, hairLine, hairTexture, eyeColour, eyeShape, eyeBrows, cheek, lips, participantAge, participantOccupation, participantLocation)
VALUES  (1, 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'n', 'o', 'p', 'q', 'r' );


ALTER TABLE avatars
ADD COLUMN nose VARCHAR(40) NOT NULL,
ADD COLUMN beard VARCHAR(40),
ADD COLUMN hairColour VARCHAR(40) NOT NULL,
ADD COLUMN hairLength VARCHAR(40) NOT NULL,
ADD COLUMN hairLine VARCHAR(40) NOT NULL,
ADD COLUMN hairTexture VARCHAR(40) NOT NULL,
ADD COLUMN eyeColour VARCHAR(40) NOT NULL,
ADD COLUMN eyeShape VARCHAR(40) NOT NULL,
ADD COLUMN eyeBrows VARCHAR(40) NOT NULL,
ADD COLUMN cheek VARCHAR(40) NOT NULL,
ADD COLUMN lips VARCHAR(40) NOT NULL,
ADD COLUMN participantAge VARCHAR(40) NOT NULL,
ADD COLUMN participantOccupation VARCHAR(40) NOT NULL,
ADD COLUMN participantLocation VARCHAR(40) NOT NULL,
ADD COLUMN posting_date DATE NOT NULL DEFAULT CURRENT_DATE;
