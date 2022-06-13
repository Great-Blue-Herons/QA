CREATE DATABASE IF NOT EXISTS qa;
\c qa;

-- Table: public.questions

CREATE TABLE IF NOT EXISTS public.questions
(
    id bigint NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    product_id bigint NOT NULL,
    body text COLLATE pg_catalog."default" NOT NULL,
    date_written bigint NOT NULL DEFAULT EXTRACT(epoch FROM CURRENT_TIMESTAMP),
    asker_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    asker_email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    reported smallint NOT NULL DEFAULT 0,
    helpful bigint NOT NULL DEFAULT 0,
    CONSTRAINT questions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.questions
    OWNER to soniaannfriscia;
-- Index: product_id_questions_ind

-- DROP INDEX IF EXISTS public.product_id_questions_ind;

CREATE INDEX IF NOT EXISTS product_id_questions_ind
    ON public.questions USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.answers

CREATE TABLE IF NOT EXISTS public.answers
(
    id bigint NOT NULL DEFAULT nextval('answers_id_actual_seq'::regclass),
    question_id bigint NOT NULL,
    body text COLLATE pg_catalog."default" NOT NULL,
    date_written bigint NOT NULL DEFAULT EXTRACT(epoch FROM CURRENT_TIMESTAMP),
    answerer_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    answerer_email character varying(100) COLLATE pg_catalog."default",
    reported smallint NOT NULL DEFAULT 0,
    helpful bigint NOT NULL DEFAULT 0,
    CONSTRAINT answers_pkey1 PRIMARY KEY (id),
    CONSTRAINT an_question_id_fk FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers
    OWNER to soniaannfriscia;
-- Index: an_question_id_index

-- DROP INDEX IF EXISTS public.an_question_id_index;

CREATE INDEX IF NOT EXISTS an_question_id_index
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_q

-- DROP INDEX IF EXISTS public.fki_q;

CREATE INDEX IF NOT EXISTS fki_q
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;



-- Table: public.answers_photos

CREATE TABLE IF NOT EXISTS public.answers_photos
(
    id bigint NOT NULL DEFAULT nextval('answers_photos_id_actual_seq'::regclass),
    answer_id bigint NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT answers_photos_pkey1 PRIMARY KEY (id),
    CONSTRAINT photos_answer_id_fk FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers_photos
    OWNER to soniaannfriscia;
-- Index: fki_photos_answer_id_fk

-- DROP INDEX IF EXISTS public.fki_photos_answer_id_fk;

CREATE INDEX IF NOT EXISTS fki_photos_answer_id_fk
    ON public.answers_photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: photos_answer_id_index

-- DROP INDEX IF EXISTS public.photos_answer_id_index;

CREATE INDEX IF NOT EXISTS photos_answer_id_index
    ON public.answers_photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;