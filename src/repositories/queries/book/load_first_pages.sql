select p.*
from story_maker.page p
where
      id_book = $1 and
    (select count(*) from story_maker.page_choice where target_page = p.id) = 0
