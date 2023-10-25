insert into story_maker.user_favorite (id_book, id_user) values ($1, $2)
ON CONFLICT (id_book, id_user)
DO NOTHING;
