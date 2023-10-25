select c.*, p.title
from story_maker.page_choice c
inner join story_maker.page p on c.target_page = p.id
inner join story_maker.book b on b.id = p.id_book
where b.id = $1;
