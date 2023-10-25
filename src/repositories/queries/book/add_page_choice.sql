insert into story_maker.page_choice (id_page, sort_index, target_page, value, target_book) values ($1, $2, $3, $4, $5) returning id;
