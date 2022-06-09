CREATE DATABASE IF NOT EXISTS qa;
\c qa;

CREATE TABLE IF NOT EXISTS public.questions
(
    id bigint NOT NULL,
    product_id bigint NOT NULL,
    body character(1000) COLLATE pg_catalog."default" NOT NULL,
    date_written bigint NOT NULL,
    asker_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    asker_email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    reported smallint NOT NULL DEFAULT 0,
    helpful bigint NOT NULL DEFAULT 0,
    CONSTRAINT questions_pkey1 PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.questions
    OWNER to soniaannfriscia;
-- Index: product_id_questions_index

-- DROP INDEX IF EXISTS public.product_id_questions_index;

CREATE INDEX IF NOT EXISTS product_id_questions_index
    ON public.questions USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.answers
(
    id bigint NOT NULL,
    question_id bigint NOT NULL,
    body character(1000) COLLATE pg_catalog."default" NOT NULL,
    date_written bigint NOT NULL,
    answerer_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    answerer_email character varying(100) COLLATE pg_catalog."default",
    reported smallint NOT NULL DEFAULT 0,
    helpful bigint NOT NULL DEFAULT 0,
    CONSTRAINT answers_pkey PRIMARY KEY (id),
    CONSTRAINT question_id_fk FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers
    OWNER to soniaannfriscia;
-- Index: fki_question_id_fk

-- DROP INDEX IF EXISTS public.fki_question_id_fk;

CREATE INDEX IF NOT EXISTS fki_question_id_fk
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: question_id_index

-- DROP INDEX IF EXISTS public.question_id_index;

CREATE INDEX IF NOT EXISTS question_id_index
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.answers_photos
(
    id bigint NOT NULL,
    answer_id bigint NOT NULL,
    url character(2048) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT answers_photos_pkey PRIMARY KEY (id),
    CONSTRAINT answer_id_fk FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers_photos
    OWNER to soniaannfriscia;
-- Index: answer_id_photos_index

-- DROP INDEX IF EXISTS public.answer_id_photos_index;

CREATE INDEX IF NOT EXISTS answer_id_photos_index
    ON public.answers_photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_answer_id_fk

-- DROP INDEX IF EXISTS public.fki_answer_id_fk;

CREATE INDEX IF NOT EXISTS fki_answer_id_fk
    ON public.answers_photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;