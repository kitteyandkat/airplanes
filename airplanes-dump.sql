--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: airport; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.airport (
    airportcod integer NOT NULL,
    name character varying,
    city character varying,
    country character varying
);


--
-- Name: flight; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flight (
    flightcod integer NOT NULL,
    fromairportcod integer,
    toairportcod integer,
    company character varying(10),
    duration integer,
    planecod integer
);


--
-- Name: model; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model (
    modelcod integer NOT NULL,
    make character varying,
    version character varying,
    engines integer
);


--
-- Name: plane; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plane (
    planecod integer NOT NULL,
    name character varying(30),
    modelcod integer
);


--
-- Data for Name: airport; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.airport (airportcod, name, city, country) FROM stdin;
1	Sa Carneiro	Porto	Portugal
3	Portela	Lisboa	Portugal
5	Faro	Faro	Portugal
2	Madeira	Funchal	Portugal
4	Ponta Delgada	S. Miguel	Portugal
9	Orly	Paris	France
8	Charles de Gaule	Paris	France
11	Heathrow	Londres	United Kingdom
12	Gatwick	Londres	United Kingdom
\.


--
-- Data for Name: flight; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.flight (flightcod, fromairportcod, toairportcod, company, duration, planecod) FROM stdin;
1008	3	12	Portugalia	3	4
1007	5	1	TAP	1	5
1009	1	3	Portugalia	1	2
1005	9	2	AirFrance	2	3
1003	2	12	BA	2	5
1006	8	11	BA	1	5
1004	4	3	SATA	3	6
1111	1	3	TAP	2	3
\.


--
-- Data for Name: model; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.model (modelcod, make, version, engines) FROM stdin;
1	Douglas	DC-10	3
2	Boeing	737	2
3	Boeing	747	4
4	Airbus	A300	2
5	Airbus	A340	4
\.


--
-- Data for Name: plane; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.plane (planecod, name, modelcod) FROM stdin;
1	Scott Adams	1
2	Milo Manara	1
4	Henki Bilal	3
5	Gary Larson	4
6	Bill Waterson	4
7	J R R Tolkien	3
8	Franquin	3
9	Douglas Adams	1
3	Serpieri	5
\.


--
-- Name: airport airport_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.airport
    ADD CONSTRAINT airport_pkey PRIMARY KEY (airportcod);


--
-- Name: flight flight_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT flight_pkey PRIMARY KEY (flightcod);


--
-- Name: model model_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_pkey PRIMARY KEY (modelcod);


--
-- Name: plane plane_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plane
    ADD CONSTRAINT plane_pkey PRIMARY KEY (planecod);


--
-- Name: flight flight_fromairportcod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT flight_fromairportcod_fkey FOREIGN KEY (fromairportcod) REFERENCES public.airport(airportcod);


--
-- Name: flight flight_planecod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT flight_planecod_fkey FOREIGN KEY (planecod) REFERENCES public.plane(planecod);


--
-- Name: flight flight_toairportcod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT flight_toairportcod_fkey FOREIGN KEY (toairportcod) REFERENCES public.airport(airportcod);


--
-- Name: plane plane_modelcod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plane
    ADD CONSTRAINT plane_modelcod_fkey FOREIGN KEY (modelcod) REFERENCES public.model(modelcod);


--
-- PostgreSQL database dump complete
--

