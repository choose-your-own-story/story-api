select * from story_maker.genre where id_parent = $1 or $1 is null order by name;
