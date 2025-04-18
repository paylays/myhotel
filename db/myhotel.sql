PGDMP  -    9                }            myhotel    17.3    17.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    32777    myhotel    DATABASE     m   CREATE DATABASE myhotel WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE myhotel;
                  	   payylayss    false            T           1247    40969    room_status    TYPE     _   CREATE TYPE public.room_status AS ENUM (
    'available',
    'occupied',
    'maintenance'
);
    DROP TYPE public.room_status;
       public            	   payylayss    false            �            1259    40976    rooms    TABLE     �   CREATE TABLE public.rooms (
    id integer NOT NULL,
    room_number character varying(20) NOT NULL,
    type character varying(50) NOT NULL,
    price numeric(10,2) NOT NULL,
    status public.room_status,
    created_at timestamp without time zone
);
    DROP TABLE public.rooms;
       public         heap r    	   payylayss    false    852            �            1259    40975    rooms_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.rooms_id_seq;
       public            	   payylayss    false    220                       0    0    rooms_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;
          public            	   payylayss    false    219            �            1259    32805    users    TABLE     5  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash text NOT NULL,
    role character varying(10) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap r    	   payylayss    false            �            1259    32804    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public            	   payylayss    false    218                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public            	   payylayss    false    217            b           2604    40979    rooms id    DEFAULT     d   ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);
 7   ALTER TABLE public.rooms ALTER COLUMN id DROP DEFAULT;
       public            	   payylayss    false    219    220    220            _           2604    32808    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public            	   payylayss    false    218    217    218            �          0    40976    rooms 
   TABLE DATA           Q   COPY public.rooms (id, room_number, type, price, status, created_at) FROM stdin;
    public            	   payylayss    false    220   �       �          0    32805    users 
   TABLE DATA           Q   COPY public.users (id, name, email, password_hash, role, created_at) FROM stdin;
    public            	   payylayss    false    218   �                  0    0    rooms_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.rooms_id_seq', 2, true);
          public            	   payylayss    false    219            	           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public            	   payylayss    false    217            h           2606    40981    rooms rooms_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_pkey;
       public              	   payylayss    false    220            j           2606    40983    rooms rooms_room_number_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_room_number_key UNIQUE (room_number);
 E   ALTER TABLE ONLY public.rooms DROP CONSTRAINT rooms_room_number_key;
       public              	   payylayss    false    220            d           2606    32816    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public              	   payylayss    false    218            f           2606    32814    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public              	   payylayss    false    218            �   D   x�3�4���K�I�465 =�Ĳ�̜�$���������������������������)W� ��'      �      x�3�-N-R0�,R���9�z����*FI*�F*~��FN�n.Q����a�!.�������I��~Ua�e�yyQ�Y%I���^!e�Εef�`�8��LuLtMͬM�M��L-���b���� �s$Y     