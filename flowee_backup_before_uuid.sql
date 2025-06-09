--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Debian 16.9-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: flowee_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO flowee_user;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: flowee_user
--

COMMENT ON SCHEMA public IS '';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: account_status_enum; Type: TYPE; Schema: public; Owner: flowee_user
--

CREATE TYPE public.account_status_enum AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'PENDING'
);


ALTER TYPE public.account_status_enum OWNER TO flowee_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.account (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying NOT NULL,
    "activationToken" character varying,
    "tokenExpiresAt" timestamp without time zone,
    status public.account_status_enum DEFAULT 'PENDING'::public.account_status_enum NOT NULL
);


ALTER TABLE public.account OWNER TO flowee_user;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_id_seq OWNER TO flowee_user;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: client; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.client (
    id integer NOT NULL,
    "clientName" character varying,
    status character varying DEFAULT 'ACTIVE'::character varying,
    account_id integer
);


ALTER TABLE public.client OWNER TO flowee_user;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_id_seq OWNER TO flowee_user;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying NOT NULL,
    address character varying,
    "contactInfo" character varying,
    "createdAt" timestamp without time zone
);


ALTER TABLE public.company OWNER TO flowee_user;

--
-- Name: company user; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public."company user" (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    account_id integer,
    "companyId" integer
);


ALTER TABLE public."company user" OWNER TO flowee_user;

--
-- Name: company user_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public."company user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."company user_id_seq" OWNER TO flowee_user;

--
-- Name: company user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public."company user_id_seq" OWNED BY public."company user".id;


--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_id_seq OWNER TO flowee_user;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: deliverable; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.deliverable (
    id integer NOT NULL,
    name character varying NOT NULL,
    perimeter character varying,
    "endDate" character varying,
    status character varying,
    "createdAt" character varying,
    "reviewTimes" integer,
    "projectId" integer
);


ALTER TABLE public.deliverable OWNER TO flowee_user;

--
-- Name: deliverable_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.deliverable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.deliverable_id_seq OWNER TO flowee_user;

--
-- Name: deliverable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.deliverable_id_seq OWNED BY public.deliverable.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO flowee_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO flowee_user;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: project; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.project (
    id integer NOT NULL,
    "projectName" character varying,
    "companyUserId" integer NOT NULL,
    description character varying,
    "startDate" character varying,
    "endDate" character varying,
    status character varying DEFAULT 'NOT_STARTED'::character varying NOT NULL,
    "clientId" integer NOT NULL
);


ALTER TABLE public.project OWNER TO flowee_user;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project_id_seq OWNER TO flowee_user;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: flowee_user
--

CREATE TABLE public.task (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    status character varying,
    "startDate" character varying,
    "endDate" character varying,
    "deliverableId" integer
);


ALTER TABLE public.task OWNER TO flowee_user;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: flowee_user
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_id_seq OWNER TO flowee_user;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: flowee_user
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- Name: company user id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public."company user" ALTER COLUMN id SET DEFAULT nextval('public."company user_id_seq"'::regclass);


--
-- Name: deliverable id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.deliverable ALTER COLUMN id SET DEFAULT nextval('public.deliverable_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: project id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.account (id, email, password, role, "activationToken", "tokenExpiresAt", status) FROM stdin;
1	admin@flowee.io	$argon2id$v=19$m=65536,t=3,p=4$hOw3NlhLFJRgDs11mHJ0Ew$0Ws0rAAvptXHsEeRnqTr7aPYSlP+LUAJ2BsLuRGzLp8	ADMIN	\N	\N	ACTIVE
6	cyriellethomas.pro@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$CPy4g6R7fzICGt630l0IXA$N3d2SyOE5jPTVc0Kxw000dBfQVKxbcC6z9nANnaYCKM	CLIENT	\N	\N	ACTIVE
12	thomascyrielle@yahoo.fr	$argon2id$v=19$m=65536,t=3,p=4$e6DL9hWPOCoHPnHJUKg+4w$UPlQri5ZhZtYhDLYTRa1kxVqpfK0xFsEkarC00Egi4Y	CLIENT	\N	\N	ACTIVE
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.client (id, "clientName", status, account_id) FROM stdin;
5	Cyrielle	ACTIVE	6
12	Cyr	INACTIVE	12
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.company (id, name, address, "contactInfo", "createdAt") FROM stdin;
1	Flowee Corp	123 rue des projets	contact@flowee.io	2025-05-27 13:01:21.388
\.


--
-- Data for Name: company user; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public."company user" (id, firstname, lastname, account_id, "companyId") FROM stdin;
1	Cyrielle	Admin	1	1
\.


--
-- Data for Name: deliverable; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.deliverable (id, name, perimeter, "endDate", status, "createdAt", "reviewTimes", "projectId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1748290594382	1748290593Init1748290594382
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.project (id, "projectName", "companyUserId", description, "startDate", "endDate", status, "clientId") FROM stdin;
2	projet de dinguo	1	vVFQBFQEB	2025-06-02T13:51:43.922Z	2028-08-22	NOT_STARTED	5
8	projet de dinguo	1	vkucv	2025-06-04T20:43:27.250Z	2025-06-20	NOT_STARTED	5
9	projet de dinguo	1	vFG	2025-06-04T20:57:06.321Z	2025-06-13	NOT_STARTED	5
10	projet de dinguo	1	vfaevfaev	2025-06-04T20:57:47.023Z	2025-06-12	NOT_STARTED	5
12	projet de dinguo	1	qfbdsb	2025-06-05T07:02:52.991Z	2025-06-20	NOT_STARTED	5
13	Super projet du JEUDI	1	vfBSZFBV	2025-06-05T07:03:53.162Z	2025-06-20	NOT_STARTED	5
14	HEllo	1	qbdd	2025-06-05T07:17:33.746Z	2025-06-20	NOT_STARTED	5
15	Kobido	1	vVSZBV	2025-06-05T08:27:38.541Z	2025-06-27	NOT_STARTED	12
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: flowee_user
--

COPY public.task (id, name, description, status, "startDate", "endDate", "deliverableId") FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.account_id_seq', 12, true);


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.client_id_seq', 12, true);


--
-- Name: company user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public."company user_id_seq"', 1, true);


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.company_id_seq', 1, true);


--
-- Name: deliverable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.deliverable_id_seq', 2, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.project_id_seq', 15, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: flowee_user
--

SELECT pg_catalog.setval('public.task_id_seq', 1, true);


--
-- Name: company PK_056f7854a7afdba7cbd6d45fc20; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY (id);


--
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- Name: company user PK_51957339b1339043f06ff4d57f9; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public."company user"
    ADD CONSTRAINT "PK_51957339b1339043f06ff4d57f9" PRIMARY KEY (id);


--
-- Name: account PK_54115ee388cdb6d86bb4bf5b2ea; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: client PK_96da49381769303a6515a8785c7; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY (id);


--
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- Name: deliverable PK_fbed21e1ad3464d9fb7729ad51d; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.deliverable
    ADD CONSTRAINT "PK_fbed21e1ad3464d9fb7729ad51d" PRIMARY KEY (id);


--
-- Name: company user REL_3bc4f76c602938227d2ffb5497; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public."company user"
    ADD CONSTRAINT "REL_3bc4f76c602938227d2ffb5497" UNIQUE (account_id);


--
-- Name: client REL_b3627c981b3d782cb5a2845e3d; Type: CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "REL_b3627c981b3d782cb5a2845e3d" UNIQUE (account_id);


--
-- Name: IDX_b3627c981b3d782cb5a2845e3d; Type: INDEX; Schema: public; Owner: flowee_user
--

CREATE UNIQUE INDEX "IDX_b3627c981b3d782cb5a2845e3d" ON public.client USING btree (account_id);


--
-- Name: company user FK_3bc4f76c602938227d2ffb54971; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public."company user"
    ADD CONSTRAINT "FK_3bc4f76c602938227d2ffb54971" FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: company user FK_54d628a6248b332c2ea30d37ae4; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public."company user"
    ADD CONSTRAINT "FK_54d628a6248b332c2ea30d37ae4" FOREIGN KEY ("companyId") REFERENCES public.company(id) ON DELETE SET NULL;


--
-- Name: project FK_816f608a9acf4a4314c9e1e9c66; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES public.client(id);


--
-- Name: deliverable FK_a7c9e89ea29e2058b4c85851169; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.deliverable
    ADD CONSTRAINT "FK_a7c9e89ea29e2058b4c85851169" FOREIGN KEY ("projectId") REFERENCES public.project(id);


--
-- Name: client FK_b3627c981b3d782cb5a2845e3d8; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8" FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: project FK_bb5e081fb9b8b514fbb86059728; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_bb5e081fb9b8b514fbb86059728" FOREIGN KEY ("companyUserId") REFERENCES public."company user"(id) ON DELETE SET NULL;


--
-- Name: task FK_f5a50c31ccad644d8826ceea22b; Type: FK CONSTRAINT; Schema: public; Owner: flowee_user
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_f5a50c31ccad644d8826ceea22b" FOREIGN KEY ("deliverableId") REFERENCES public.deliverable(id) ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: flowee_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: TABLE account; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.account TO flowee;


--
-- Name: SEQUENCE account_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.account_id_seq TO flowee;


--
-- Name: TABLE client; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.client TO flowee;


--
-- Name: SEQUENCE client_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.client_id_seq TO flowee;


--
-- Name: TABLE company; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.company TO flowee;


--
-- Name: TABLE "company user"; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public."company user" TO flowee;


--
-- Name: SEQUENCE "company user_id_seq"; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public."company user_id_seq" TO flowee;


--
-- Name: SEQUENCE company_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.company_id_seq TO flowee;


--
-- Name: TABLE deliverable; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.deliverable TO flowee;


--
-- Name: SEQUENCE deliverable_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.deliverable_id_seq TO flowee;


--
-- Name: TABLE migrations; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.migrations TO flowee;


--
-- Name: SEQUENCE migrations_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.migrations_id_seq TO flowee;


--
-- Name: TABLE project; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.project TO flowee;


--
-- Name: SEQUENCE project_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.project_id_seq TO flowee;


--
-- Name: TABLE task; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON TABLE public.task TO flowee;


--
-- Name: SEQUENCE task_id_seq; Type: ACL; Schema: public; Owner: flowee_user
--

GRANT ALL ON SEQUENCE public.task_id_seq TO flowee;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO flowee_user;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO flowee;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO flowee_user;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO flowee;


--
-- PostgreSQL database dump complete
--

