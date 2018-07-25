DROP TABLE IF EXISTS "Meme";
DROP TABLE IF EXISTS "Profile";

CREATE TABLE "Profile" (
  "id"          SERIAL PRIMARY KEY     NOT NULL,
  "email"       CHARACTER VARYING(500) NOT NULL,
  "displayName" CHARACTER VARYING(500) NOT NULL,
  "biography"   CHARACTER VARYING(500) NOT NULL,
  "avatarUrl"   CHARACTER VARYING(500) NOT NULL
);

CREATE TABLE "Meme" (
  "id"       SERIAL PRIMARY KEY                NOT NULL,
  "photoUrl" CHARACTER VARYING(500)            NOT NULL,
  "ownerId"  INTEGER REFERENCES "Profile" ("id")
);