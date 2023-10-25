insert into story_maker.page (id_book, title) values ($1, $2) returning id, title;
