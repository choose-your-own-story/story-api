select b.*,
       g.name g_name,
       sg.name sg_name,
       coalesce(s.read_count, 0) read_count,
       coalesce(s.like_count, 0) like_count,
       ucr.id_page id_page
from story_maker.book b
    inner join user_continue_reading ucr on b.id = ucr.id_book
         left join story_maker.book_stat s on b.id = s.id_book
         left join story_maker.genre g on b.id_genre = g.id
         left join story_maker.genre sg on b.id_sub_genre = sg.id
where
        ucr.id_user = $1
order by b.title,
         b.id_genre,
         b.id_sub_genre
