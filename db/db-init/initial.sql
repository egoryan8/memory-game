DROP TABLE IF EXISTS topics cascade;
DROP TABLE IF EXISTS comments cascade;
DROP TABLE IF EXISTS likes cascade;
DROP TABLE IF EXISTS themes;

--------------------------
-------Topics table-------
--------------------------
DROP SEQUENCE IF EXISTS topics_id_seq;
CREATE SEQUENCE topics_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE topics
(
    id         integer DEFAULT nextval('topics_id_seq') NOT NULL,
    body       text                                     NOT NULL,
    user_id    integer                                  NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT topics_pkey PRIMARY KEY ("id")
) WITH (oids = false);
--------------------------
------Comments table------
--------------------------
DROP SEQUENCE IF EXISTS comments_id_seq;
CREATE SEQUENCE comments_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE comments
(
    id         integer DEFAULT nextval('comments_id_seq') NOT NULL,
    comment_id integer,
    topic_id   integer,
    user_id    integer                                    NOT NULL,
    body       text                                       NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT comments_pkey PRIMARY KEY (id)
) WITH (oids = false);

ALTER TABLE comments
    ADD CONSTRAINT fk_comments_comment_id FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE;
ALTER TABLE comments
    ADD CONSTRAINT fk_comments_topic_id FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE;
--------------------------
-------Likes table--------
--------------------------
DROP SEQUENCE IF EXISTS likes_id_seq;
CREATE SEQUENCE likes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE likes
(
    id         integer DEFAULT nextval('likes_id_seq') NOT NULL,
    comment_id integer,
    topic_id   integer,
    user_id    integer                                 NOT NULL,
    emoji      text                                    NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT likes_pkey PRIMARY KEY ("id")
) WITH (oids = false);

ALTER TABLE likes
    ADD CONSTRAINT fk_likes_comment_id FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE;
ALTER TABLE likes
    ADD CONSTRAINT fk_likes_topic_id FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE;
--------------------------
-----UserTheme table------
--------------------------

DROP SEQUENCE IF EXISTS themes_id_seq;
CREATE SEQUENCE themes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE themes
(
    id      integer DEFAULT nextval('themes_id_seq') NOT NULL,
    user_id integer                                  NOT NULL UNIQUE,
    theme   text                                     NOT NULL,
    CONSTRAINT themes_pkey PRIMARY KEY ("id")
) WITH (oids = false);


--------------------------
----Functions&Triggers----
--------------------------
CREATE OR REPLACE FUNCTION set_created_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_created_at_comments_trigger
    BEFORE INSERT
    ON comments
    FOR EACH ROW
EXECUTE FUNCTION set_created_at();
CREATE TRIGGER set_created_at_topics_trigger
    BEFORE INSERT
    ON topics
    FOR EACH ROW
EXECUTE FUNCTION set_created_at();
CREATE TRIGGER set_created_at_likes_trigger
    BEFORE INSERT
    ON likes
    FOR EACH ROW
EXECUTE FUNCTION set_created_at();


CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_comments_trigger
    BEFORE UPDATE
    ON comments
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_topics_trigger
    BEFORE UPDATE
    ON topics
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_likes_trigger
    BEFORE UPDATE
    ON likes
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

--------------------------
-------Initial data-------
--------------------------
INSERT INTO topics
VALUES (1, 'Topic', 7153);
INSERT INTO comments
VALUES (1, NULL, 1, 7153, 'Some comment');
INSERT INTO likes
VALUES (1, NULL, 1, 7153, '😎');
INSERT INTO likes
VALUES (2, 1, NULL, 7153, '😏');
INSERT INTO themes
VALUES (1, 1333365, 'dark'),
       (2, 1333366, 'light');
