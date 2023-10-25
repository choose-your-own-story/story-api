insert into story_maker.book_stat (id_book) values ($1)
ON CONFLICT (id_book)
DO
UPDATE SET read_count = (select read_count+1 from story_maker.book_stat where id_book = $1)
