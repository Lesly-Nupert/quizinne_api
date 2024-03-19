BEGIN; 

CREATE TABLE IF NOT EXISTS "member" (
  "id_member" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "pseudo" varchar(20) NOT NULL,
  "email" varchar(100) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "recipe" (
  "id_recipe" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" varchar(100) NOT NULL,
  "image" varchar (255),
  "category" varchar(10) NOT NULL,
  "time_cook_hours" smallint NOT NULL,
  "time_cook_minutes" smallint NOT NULL,
  "difficulty" varchar(10) NOT NULL,
  "nb_persons" smallint NOT NULL,
  "ingredients" text NOT NULL,
  "steps" text NOT NULL,
  "id_member" integer NOT NULL REFERENCES member("id_member") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "comment" (
  "id_comment" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "content" varchar(255) NOT NULL,
  "id_member" integer NOT NULL REFERENCES member("id_member") ON DELETE CASCADE,
  "id_recipe" integer NOT NULL REFERENCES recipe("id_recipe") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "likes" (
  "id_likes" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "id_member" integer NOT NULL REFERENCES member("id_member")ON DELETE CASCADE,
  "id_recipe" integer NOT NULL REFERENCES recipe("id_recipe") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  -- un membre peut liker une seule fois une recette, pas de doublon dans la bdd avec UNIQUE
  UNIQUE ("id_member", "id_recipe")
);

COMMIT; 






-- BEGIN; 

-- DROP TABLE IF EXISTS recipe, member, comment, likes CASCADE;

-- CREATE TABLE member (
--   "id_member" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   "pseudo" varchar(20) NOT NULL,
--   "email" varchar(100) NOT NULL UNIQUE,
--   "password" varchar(255) NOT NULL,
--   "created_at" timestamptz NOT NULL DEFAULT now(),
--   "updated_at" timestamptz NOT NULL DEFAULT now()
-- );

-- CREATE TABLE recipe (
--   "id_recipe" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   "title" varchar(100) NOT NULL,
--   "image" varchar (255),
--   "category" varchar(10) NOT NULL,
--   "time_cook_hours" smallint NOT NULL,
--   "time_cook_minutes" smallint NOT NULL,
--   "difficulty" varchar(10) NOT NULL,
--   "nb_persons" smallint NOT NULL,
--   "ingredients" text NOT NULL,
--   "steps" text NOT NULL,
--   "id_member" integer NOT NULL REFERENCES member("id_member") ON DELETE CASCADE,
--   "created_at" timestamptz NOT NULL DEFAULT now(),
--   "updated_at" timestamptz NOT NULL DEFAULT now()
-- );

-- CREATE TABLE comment (
--   "id_comment" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   "content" varchar(255) NOT NULL,
--   "id_member" integer NOT NULL REFERENCES member("id_member") ON DELETE CASCADE,
--   "id_recipe" integer NOT NULL REFERENCES recipe("id_recipe") ON DELETE CASCADE,
--   "created_at" timestamptz NOT NULL DEFAULT now(),
--   "updated_at" timestamptz NOT NULL DEFAULT now()
-- );

-- CREATE TABLE likes (
--   "id_likes" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   "id_member" integer NOT NULL REFERENCES member("id_member")ON DELETE CASCADE,
--   "id_recipe" integer NOT NULL REFERENCES recipe("id_recipe") ON DELETE CASCADE,
--   "created_at" timestamptz NOT NULL DEFAULT now(),
--   -- un membre peut liker une seule fois une recette, pas de doublon dans la bdd avec UNIQUE
--   UNIQUE ("id_member", "id_recipe")
-- );

-- COMMIT; 