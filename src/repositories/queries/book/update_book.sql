update
    story_maker.book
set
    title=$1,
    description=$2,
    cover=$3,
    id_genre=$4,
    id_sub_genre=$5,
    active=$6
where id = $7
  and id_user = $8;
