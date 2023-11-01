DROP TABLE IF EXISTS topics cascade;
DROP TABLE IF EXISTS comments cascade;
DROP TABLE IF EXISTS replies cascade;
DROP TABLE IF EXISTS likes cascade;
DROP TABLE IF EXISTS themes;
--------------------------
-------Topics table-------
--------------------------
DROP TABLE IF EXISTS topics;
DROP SEQUENCE IF EXISTS topics_id_seq;
CREATE SEQUENCE topics_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE topics (
    id integer DEFAULT nextval('topics_id_seq') NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    user_id integer NOT NULL,
    user_name text NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT topics_pkey PRIMARY KEY (id)
) WITH (oids = false);
--------------------------
------Comments table------
--------------------------
DROP SEQUENCE IF EXISTS comments_id_seq;
DROP SEQUENCE IF EXISTS comments_id_seq;
CREATE SEQUENCE comments_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE comments (
    id integer DEFAULT nextval('comments_id_seq') NOT NULL,
    comment_id integer,
    topic_id integer,
    user_id integer NOT NULL,
    user_name text NOT NULL,
    body text NOT NULL,
    img_url text,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT comments_pkey PRIMARY KEY (id)
) WITH (oids = false);

ALTER TABLE comments ADD CONSTRAINT fk_comments_comment_id FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE;
ALTER TABLE comments ADD CONSTRAINT fk_comments_topic_id FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
--------------------------
------Replies table------
--------------------------
DROP SEQUENCE IF EXISTS replies_id_seq;
DROP SEQUENCE IF EXISTS replies_id_seq;
CREATE SEQUENCE replies_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE replies (
    id integer DEFAULT nextval('replies_id_seq') NOT NULL,
    comment_id integer,
    topic_id integer,
    reply_id integer,
    user_id integer NOT NULL,
    user_name text NOT NULL,
    body text NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT replies_pkey PRIMARY KEY (id)
) WITH (oids = false);

ALTER TABLE replies ADD CONSTRAINT fk_replies_comment_id FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE;
ALTER TABLE replies ADD CONSTRAINT fk_replies_topic_id FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;
--------------------------
-------Likes table--------
--------------------------
DROP TABLE IF EXISTS likes;
DROP SEQUENCE IF EXISTS likes_id_seq;
CREATE SEQUENCE likes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE likes (
    id integer DEFAULT nextval('likes_id_seq') NOT NULL,
    comment_id integer,
    reply_id integer,
    topic_id integer,
    user_id integer NOT NULL,
    emoji text NOT NULL,
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT likes_pkey PRIMARY KEY (id)
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

CREATE TABLE themes (
    id      integer DEFAULT nextval('themes_id_seq') NOT NULL,
    user_id integer                                  NOT NULL UNIQUE,
    theme   text                                     NOT NULL,
    CONSTRAINT themes_pkey PRIMARY KEY (id)
) WITH (oids = false);
--------------------------
----Functions&Triggers----
--------------------------
CREATE OR REPLACE FUNCTION set_created_at()
  RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_created_at_comments_trigger BEFORE INSERT ON comments FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER set_created_at_replies_trigger BEFORE INSERT ON replies FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER set_created_at_topics_trigger BEFORE INSERT ON topics FOR EACH ROW EXECUTE FUNCTION set_created_at();
CREATE TRIGGER set_created_at_likes_trigger BEFORE INSERT ON likes FOR EACH ROW EXECUTE FUNCTION set_created_at();

CREATE OR REPLACE FUNCTION set_updated_at()
  RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_comments_trigger BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_replies_trigger BEFORE UPDATE ON replies FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_topics_trigger BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_likes_trigger BEFORE UPDATE ON likes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
--------------------------
-------Initial data-------
--------------------------
INSERT INTO topics VALUES (1234567, 'Нашествие белок', 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании приоретизации разума над эмоциями. В частности, граница обучения кадров требует определения и уточнения существующих финансовых и административных условий. Есть над чем задуматься: сделанные на базе интернет-аналитики выводы будут ассоциативно распределены по отраслям.', 7153, 'Артур Петрович');
INSERT INTO comments VALUES (11223344, NULL, 1234567, 32323, 'Федя Жуков', 'Современные технологии достигли такого уровня, что новая модель организационной деятельности напрямую зависит от вывода текущих активов. В своём стремлении повысить качество жизни, они забывают, что консультация с широким активом прекрасно подходит для реализации позиций, занимаемых участниками в отношении поставленных задач', NULL);
INSERT INTO comments VALUES (11223345, NULL, 1234567, 43433, 'Жора Федин', 'Современные технологии достигли такого уровня, что новая модель организационной деятельности напрямую зависит от вывода текущих активов. В своём стремлении повысить качество жизни, они забывают, что консультация с широким активом прекрасно подходит для реализации позиций, занимаемых участниками в отношении поставленных задач', NULL);
INSERT INTO comments VALUES (11223346, NULL, 1234567, 21332, 'Дима Жижин', 'Современные технологии достигли такого уровня, что новая модель организационной деятельности напрямую зависит от вывода текущих активов. В своём стремлении повысить качество жизни, они забывают, что консультация с широким активом прекрасно подходит для реализации позиций, занимаемых участниками в отношении поставленных задач', NULL);
