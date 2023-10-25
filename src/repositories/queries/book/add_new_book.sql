insert into story_maker.book (title, id_user, description, cover) values ($1, $2, $3, $4) returning id;
