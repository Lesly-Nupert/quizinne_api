-- BEGIN;

-- TRUNCATE TABLE member RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE recipe RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE comment RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE likes RESTART IDENTITY CASCADE;

-- COMMIT;



-- BEGIN;

-- DROP TABLE IF EXISTS recipe CASCADE;

-- DROP TABLE IF EXISTS member CASCADE;

-- DROP TABLE IF EXISTS comment CASCADE;

-- COMMIT;