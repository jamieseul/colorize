USE `colorize`;

INSERT INTO `users` (`userMail`,`userPassword`,`userName`,`tones_id`,`birthDate`,`gender`) VALUES ('admin@code.com','1234','admin','1','1999-09-09','male');
INSERT INTO `users` (`userMail`,`userPassword`,`userName`,`tones_id`,`birthDate`,`gender`) VALUES ('uehwan@gmail.com','1234','쿼리맨','2','1988-09-09','male');
INSERT INTO `users` (`userMail`,`userPassword`,`userName`,`tones_id`,`birthDate`,`gender`) VALUES ('sullee@naver.com','1234','화장품히스토리안','3','1976-07-06','female');
INSERT INTO `users` (`userMail`,`userPassword`,`userName`,`tones_id`,`birthDate`,`gender`) VALUES ('wonbok1213@daum.net','1234','리둑스','4','1989-01-23','male');
INSERT INTO `users` (`userMail`,`userPassword`,`userName`,`tones_id`,`birthDate`,`gender`) VALUES ('byj8801@gmail.com','1234','리웩트','5','1988-09-01','male');

INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('2','2');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('4','2');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('5','2');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('11','3');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('2','2');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('35','1');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('42','4');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('21','4');
INSERT INTO `wishLists` (`itemColors_id`,`users_id`) VALUES ('3','1');

INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('2','포토','4','4','별로좋음');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('7','포토','5','5','존나조음');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('3','포토','2','2','구림');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('1','포토','1','1','개구림');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('25','포토','3','3','안써봄');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('2','포토','4','4','별로좋음');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('17','포토','5','5','존나조음');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('53','포토','2','2','구림');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('19','포토','1','1','개구림');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('25','포토','3','3','안써봄');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('2','포토','4','4','별로좋음');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('37','포토','5','5','존나조음');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('3','포토','2','2','구림');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('19','포토','1','1','개구림');
INSERT INTO `reviews` (`itemColors_id`,`reviewPhoto`,`reviewRating`,`users_id`,`reviewMessage`) VALUES ('25','포토','3','3','안써봄');

INSERT INTO `reviewLikes` (`reviews_id`, `users_id`) VALUES ('2','1');
INSERT INTO `reviewLikes` (`reviews_id`, `users_id`) VALUES ('2','2');
INSERT INTO `reviewLikes` (`reviews_id`, `users_id`) VALUES ('3','3');
INSERT INTO `reviewLikes` (`reviews_id`, `users_id`) VALUES ('3','4');
INSERT INTO `reviewLikes` (`reviews_id`, `users_id`) VALUES ('2','5');
INSERT INTO `reviewLikes` (`reviews_id`, `users_id`) VALUES ('2','2');