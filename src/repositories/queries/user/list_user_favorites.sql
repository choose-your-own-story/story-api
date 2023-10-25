select b.*,
       g.name g_name,
       sg.name sg_name,
       coalesce(s.read_count, 0) read_count,
       coalesce(s.like_count, 0) like_count
from story_maker.book b
    inner join story_maker.user_favorite uf on b.id = uf.id_book
         left join story_maker.book_stat s on b.id = s.id_book
         left join story_maker.genre g on b.id_genre = g.id
         left join story_maker.genre sg on b.id_sub_genre = sg.id
where
        uf.id_user = $1
order by b.title,
         b.id_genre,
         b.id_sub_genre
