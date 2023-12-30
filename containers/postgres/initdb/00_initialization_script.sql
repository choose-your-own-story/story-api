\connect story_maker;

CREATE USER story_maker_user WITH PASSWORD '1234';

create schema story_maker;

alter role story_maker_user in database story_maker set search_path=story_maker;

grant all privileges on database story_maker to story_maker_user;

