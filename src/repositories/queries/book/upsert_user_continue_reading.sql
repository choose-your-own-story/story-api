insert into story_maker.user_continue_reading (id_user, id_book, id_page) values ($1, $2, $3)
ON CONFLICT (id_user, id_book)
do update set id_page = $3 where user_continue_reading.id_user = $1 and user_continue_reading.id_book = $2;
