insert into story_maker.page (id_book, title, page_type)
values ($1,
        concat('#', (select count(*) + 1 from page where id_book = $1)),
        $2)
returning id, title;
