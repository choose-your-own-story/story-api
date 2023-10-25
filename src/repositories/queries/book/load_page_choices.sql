select c.*, p.title
from story_maker.page_choice c
inner join story_maker.page p on c.target_page = p.id
where id_page = $1;
