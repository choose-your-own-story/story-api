insert into story_maker.genre (name, id_parent) values ($1, $2) returning id, name, id_parent
