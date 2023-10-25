create table story_maker.genre (
    id serial primary key,
    name varchar not null,
    id_parent int null
);

create table story_maker.tag (
    id serial primary key,
    name varchar not null
);

create table story_maker.book (
    id SERIAL PRIMARY KEY,
    id_user int not null,
    active int not null default 0,
    title varchar not null,
    description varchar null,
    cover varchar null,
    id_genre int null,
    id_sub_genre int null,
    created_date timestamp without time zone not null default now(),
    activated_date timestamp without time zone null,
    CONSTRAINT fk_book_genre
      FOREIGN KEY(id_genre)
          REFERENCES story_maker.genre(id)
);

create table story_maker.book_tag (
    id serial primary key,
    id_book int not null,
    id_tag int not null
);

create table story_maker.book_stat (
    id_book int not null unique,
    read_count int not null default 0,
    like_count int not null default 0
);

create table story_maker.book_comment (
    id serial primary key,
    id_book int not null,
    text varchar (500) not null,
    created_date timestamp without time zone not null default now()
);

create table story_maker.page(
    id serial primary key,
    id_book int not null,
    title varchar,
    page_type int not null default 0
);

create table story_maker.page_item (
    id serial primary key,
    id_page int not null,
    type int not null,
    value varchar not null
);

create table story_maker.page_choice (
    id serial primary key,
    id_page int not null,
    value varchar not null,
    sort_index int not null default 0,
    target_book int not null,
    target_page int not null
);

create table story_maker.app_user (
    id serial primary key,
    name varchar not null unique,
    thumb varchar,
    password varchar not null
);

create table story_maker.user_continue_reading(
    id_user int not null,
    id_book int not null,
    id_page int not null,
    primary key (id_user, id_book)
);

create table story_maker.user_favorite (
    id_book int not null,
    id_user int not null,
    primary key (id_book, id_user)
);

create table story_maker.user_like (
    id_book int not null,
    id_user int not null,
    primary key (id_book, id_user)
);


insert into story_maker.app_user (name, thumb, password)
values (
    'jota',
    'https://api.jrojaspin.com.ar/story-maker/image/16132526114724429751377e153298e0a38082bf2341a_reduced.webp',
    '1234'
);

GRANT all on SCHEMA story_maker TO story_maker_user;
GRANT ALL PRIVILEGES ON all tables in schema story_maker TO story_maker_user;
GRANT ALL ON ALL TABLES IN SCHEMA story_maker TO story_maker_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA story_maker TO story_maker_user;

