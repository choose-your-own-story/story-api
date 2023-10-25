

insert into story_maker.book (id_user, active, title, description, cover) values (1, 1, 'el secreto del lago escondido', 'el mejor -y unico- libro de jota', 'https://soundtrackfest.com/wp-content/uploads/2019/07/BackToTheFuture-TheMusical-2020-Main.jpg');
insert into story_maker.book (id_user, active, title, description, cover) values (1, 1, 'viaje fantastico', 'despues del exito del primer libro, aca esta el segundo', 'https://en.wikipedia.org/wiki/Back_to_the_Future#/media/File:Back_to_the_Future.jpg');
insert into story_maker.book (id_user, active, title, description, cover) values (1, 1, 'fido en busca del hueso sabroso', 'ahora una de perros', 'https://i2.wp.com/marvin.com.mx/wp-content/uploads/2020/01/back-to-the-future-the-musical-nueva-obra-christopher-lloyd.jpg?w=1200&ssl=1');

insert into story_maker.page (id_book) values (1);
insert into story_maker.page (id_book) values (1);
insert into story_maker.page (id_book) values (1);
insert into story_maker.page (id_book) values (2);
insert into story_maker.page (id_book) values (3);



insert into story_maker.page_item (id_page, type, value) values (1, 1, 'Eres un valiente aventurero en busqueda de la perla sagrada');
insert into story_maker.page_item (id_page, type, value) values (1, 1, 'Un pariente tuyo te ha invitado a participar en una expedicion al artico. Es algo que todavia nos has hecho, pero que siempre quisiste hacer, asi que aceptas gustoso');
insert into story_maker.page_item (id_page, type, value) values (1, 1, 'Los nerevios son dificil de disimular. Sabes perfectamente la cantiad de problemas que puedes enfrenttar en una expedicion de ese calibre. Todavia recuerdas el documental sobre los osos polares hambrientos que demiembran expedicionistas distraidos.... glup');


insert into story_maker.page_item (id_page, type, value) values (2, 1, 'Por algun extranio motivo que no puedes explicar decides ver de nuevo el documental');
insert into story_maker.page_item (id_page, type, value) values (2, 1, 'Es gracioso como empieza con el nacimiento de los bebes osos. Es como ver a un oso polar defecar medianos pedazos de algodon');

insert into story_maker.page_item (id_page, type, value) values (3, 1, 'Esperas qeu atienda... tu ...tu... tuuu.... tuu... ');
insert into story_maker.page_item (id_page, type, value) values (3, 1, 'Es raro nunca tarda tanto en atender... algo raro esta pasando... ');

insert into story_maker.page_choice (id_page, sort_index, target_book, target_page, value) values (1, 1, 1, 2, 'Si deseas reeveer el documental, pasa a la pagina 2');
insert into story_maker.page_choice (id_page, sort_index, target_book, target_page, value) values (1, 2, 1, 3, 'Si deseas llamar a tu amigo y decirle qeu es un hijo de mil #$* por armar esta expedidicon, ve a la pagina 3');


insert into story_maker.genre (name) values ('accion'), ('comedia'), ('detectives'), ('economia');
insert into story_maker.genre (name, id_parent) values ('romance', 1), ('belico', 1), ('raomantica', 2), ('negra', 2), ('del hogar', 4), ('macro', 4);

insert into story_maker.tag (name) values ('gatos'), ('perros');
