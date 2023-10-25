select b.*,
       u.name as u_name,
       u.thumb u_thumb,
       g.name g_name,
       sg.name sg_name,
       coalesce(s.read_count, 0) read_count,
       coalesce(s.like_count, 0) like_count
from story_maker.book b
    inner join story_maker.app_user u on b.id_user = u.id
    left join story_maker.book_stat s on b.id = s.id_book
    left join story_maker.genre g on b.id_genre = g.id
    left join story_maker.genre sg on b.id_sub_genre = sg.id
where
      b.title like $1 and
      u.name like $2 and
      ($3 = 0 or b.id_genre = $3) and
      ($4 = 0 or b.id_sub_genre = $4) and
      b.active = 1
order by b.title,
         u.name,
         b.id_genre,
         b.id_sub_genre
