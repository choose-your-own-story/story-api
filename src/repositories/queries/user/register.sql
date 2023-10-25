insert into story_maker.app_user (name, password, thumb) values ($1, $2, $3) returning id;
