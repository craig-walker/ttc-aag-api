CREATE TABLE avatars (
  ID SERIAL PRIMARY KEY,
  avatar SMALLINT NOT NULL,
  skinTone VARCHAR(40) NOT NULL,
  jawLine VARCHAR(40) NOT NULL
);

INSERT INTO avatars (avatar, skinTone, jawLine)
VALUES  (1, 'veryFair', 'v' );
