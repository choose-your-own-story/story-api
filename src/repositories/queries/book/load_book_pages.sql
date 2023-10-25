select *,
       (select count(*) from story_maker.page_choice where target_page = page.id) recive_count,
       (select count(*) from story_maker.page_item where id_page = page.id) items_count
from story_maker.page
where id_book = $1
order by id asc;
