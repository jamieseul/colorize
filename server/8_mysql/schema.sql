SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET character_set_server = utf8;
-- SET character_set_system = utf8;

SET collation_connection = 'utf8_general_ci';
SET collation_server = 'utf8_general_ci';


DROP DATABASE IF EXISTS `colorize`;
CREATE DATABASE `colorize`;

ALTER DATABASE `colorize` DEFAULT CHARACTER SET utf8;
SET collation_database = 'utf8_general_ci';

USE `colorize`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `userMail` VARCHAR(30) NULL,
  `userPassword` VARCHAR(60) NULL,
  `userPhoto` VARCHAR(255) NULL DEFAULT 'https://cdn4.iconfinder.com/data/icons/eldorado-user/40/user-256.png',
  `userName` VARCHAR(20) NULL,
  `tones_id` INTEGER NULL,
  `birthDate` DATE NULL,
  `gender` VARCHAR(10) NULL,
  `grade` VARCHAR(10) NULL DEFAULT 'Bronze',
  `userTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `userToggle` VARCHAR(5) NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `itemColors_id` INTEGER NULL,
  `reviewPhoto` VARCHAR(255) NULL,
  `reviewRating` INTEGER NULL,
  `users_id` INTEGER NULL,
  `reviewTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `reviewMessage` MEDIUMTEXT NULL,
  `reviewToggle` VARCHAR(5) NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `categories2_id` INTEGER NULL,
  `brands_id` INTEGER NULL,
  `itemName` VARCHAR(50) NULL,
  `itemVolume` VARCHAR(10) NULL DEFAULT NULL,
  `itemPrice` INTEGER NULL,
  `itemDetail` MEDIUMTEXT NULL DEFAULT NULL,
  `itemToggle` VARCHAR(5) NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `tones`;
CREATE TABLE `tones` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `toneName` VARCHAR(10) NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `brandName` VARCHAR(10) NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(10) NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `wishLists`;
CREATE TABLE `wishLists` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `itemColors_id` INTEGER NULL,
  `users_id` INTEGER NULL,
  `wishToggle` VARCHAR(5) NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `users_id` INTEGER NULL,
  `url` VARCHAR(10) NULL,
  `logTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `categories2`;
CREATE TABLE `categories2` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `categories_id` INTEGER NULL,
  `category2Name` VARCHAR(10) NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `itemColors`;
CREATE TABLE `itemColors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `items_id` INTEGER NULL,
  `itemPhoto` VARCHAR(255) NULL,
  `itemColor` VARCHAR(20) NULL,
  `itemHex` VARCHAR(20) NULL,
  `itemDate` DATE NULL,
  `colorToggle` VARCHAR(5) NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `reviewLikes`;
CREATE TABLE `reviewLikes` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `reviews_id` INTEGER NULL,
  `users_id` INTEGER NULL,
  `likeToggle` VARCHAR(5) NULL DEFAULT 'true',
  PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD FOREIGN KEY (tones_id) REFERENCES `tones` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (itemColors_id) REFERENCES `itemColors` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);
ALTER TABLE `items` ADD FOREIGN KEY (categories2_id) REFERENCES `categories2` (`id`);
ALTER TABLE `items` ADD FOREIGN KEY (brands_id) REFERENCES `brands` (`id`);
ALTER TABLE `wishLists` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);
ALTER TABLE `wishLists` ADD FOREIGN KEY (itemColors_id) REFERENCES `itemColors` (`id`);
ALTER TABLE `logs` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);
ALTER TABLE `categories2` ADD FOREIGN KEY (categories_id) REFERENCES `categories` (`id`);
ALTER TABLE `itemColors` ADD FOREIGN KEY (items_id) REFERENCES `items` (`id`);
ALTER TABLE `reviewLikes` ADD FOREIGN KEY (reviews_id) REFERENCES `reviews` (`id`);
ALTER TABLE `reviewLikes` ADD FOREIGN KEY (users_id) REFERENCES `users` (`id`);

ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `items` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `tones` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `brands` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `wishLists` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `logs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `categories2` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `itemColors` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
ALTER TABLE `reviewLikes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



INSERT INTO `categories` (`categoryName`) VALUES ('Lip');
INSERT INTO `categories` (`categoryName`) VALUES ('Foundation');
INSERT INTO `categories` (`categoryName`) VALUES ('EyeShadow');

INSERT INTO `categories2` (`categories_id`,`category2Name`) VALUES ((SELECT `id` FROM `categories` WHERE `categoryName` = 'Lip'),'립스틱');
INSERT INTO `categories2` (`categories_id`,`category2Name`) VALUES ((SELECT `id` FROM `categories` WHERE `categoryName` = 'Lip'),'립글로스');
INSERT INTO `categories2` (`categories_id`,`category2Name`) VALUES ((SELECT `id` FROM `categories` WHERE `categoryName` = 'Lip'),'립틴트');
INSERT INTO `categories2` (`categories_id`,`category2Name`) VALUES ((SELECT `id` FROM `categories` WHERE `categoryName` = 'Lip'),'립밤');
INSERT INTO `categories2` (`categories_id`,`category2Name`) VALUES ((SELECT `id` FROM `categories` WHERE `categoryName` = 'Lip'),'립라커');

INSERT INTO `brands` (`brandName`) VALUES ('입생로랑');
INSERT INTO `brands` (`brandName`) VALUES ('아리따움');
INSERT INTO `brands` (`brandName`) VALUES ('에뛰드하우스');
INSERT INTO `brands` (`brandName`) VALUES ('세포라');
INSERT INTO `brands` (`brandName`) VALUES ('마몽드');
INSERT INTO `brands` (`brandName`) VALUES ('맥');
INSERT INTO `brands` (`brandName`) VALUES ('VDL');

INSERT INTO `tones` (`toneName`) VALUES ('Spring');
INSERT INTO `tones` (`toneName`) VALUES ('Summer');
INSERT INTO `tones` (`toneName`) VALUES ('Autumn');
INSERT INTO `tones` (`toneName`) VALUES ('Winter');
INSERT INTO `tones` (`toneName`) VALUES ('Cool');
INSERT INTO `tones` (`toneName`) VALUES ('Warm');
INSERT INTO `tones` (`toneName`) VALUES ('모르겠어요');



INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립스틱'),(SELECT `id` FROM `brands` WHERE `brandName`='입생로랑'),'루쥬 볼륍떼 샤인','4.5g',43000,'당신의 모슨 순간을 빛나게 할 달콤한 키스 스토리, 볼륍떼 컬렉션. 6가지 오일이 입술에 녹아내려 감미로운 텍스처와 생기 넘치는 컬러를 선사하는 멜팅 샤인 립스틱. 입술에 닿는 순간 녹아드는 멜팅 텍스처로 입술을 부드럽게 감싸 안아 오랫동안 편안하고 촉촉하게 케어해줍니다. 사랑스럽고 낭만적인 핑크, 자유롭고 대담한 오렌지, 관능적이고 유혹적인 레드, 섬세하고 모던한 코랄까지.. 당신이 원하는 모습으로, 당신을 가장 빛나게 도와줍니다.');
INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립밤'),(SELECT `id` FROM `brands` WHERE `brandName`='마몽드'),'크리미 틴트 컬러 밤 인텐스','2.5g',9000,'립스틱처럼 인텐스한 발색과 크리미한 벨벳 사용감을 담은 3-in-1 크레용 타입 립펜슬');
INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립라커'),(SELECT `id` FROM `brands` WHERE `brandName`='에뛰드하우스'),'매트 시크 립라커','4g',12000,'풍부한 컬러 피그먼트가 빠르게 픽싱되어 번짐이나 묻어남 없이 매트하게 유지되는 롱라스팅 립라커');
INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립틴트'),(SELECT `id` FROM `brands` WHERE `brandName`='에뛰드하우스'),'원더 펀 파크 디어 달링 소다 틴트','4g',5000,'투명하고 맑게 밀착되는 밀착되는 글로시 틴트');
INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립스틱'),(SELECT `id` FROM `brands` WHERE `brandName`='에뛰드하우스'),'미니 투 매치','2.4g',5800,'내 입술에 딱 맞는 컬러와 텍스처를 매치하여 나만의 꿀조합을 만들 수 있는 미니 립스틱');
INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립틴트'),(SELECT `id` FROM `brands` WHERE `brandName`='에뛰드하우스'),'베리 딜리셔스 컬러 인 리퀴드 립스','3.5g',9500,'촉촉한 딸기 수분과 함께 새콤 달콤한 컬러 가득한 리퀴드 립스');
INSERT INTO `items` (`categories2_id`,`brands_id`,`itemName`,`itemVolume`,`itemPrice`,`itemDetail`) VALUES ((SELECT `id` FROM `categories2` WHERE `category2Name`='립스틱'),(SELECT `id` FROM `brands` WHERE `brandName`='VDL'),'VDL 페스티벌 립스틱(러브마크)','3.3g',18000,'자석같은 밀착력의 고화소 립스틱');

INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwfd5fef6c/Makeup/RVS/3365440197626_6_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','핑크 사파리','E01D5F','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','11호 벨벳레드','B1443F','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001485_IM_01.png','BE101 피치못한 베이지','DA7666','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000545_IM_01.png','PK001 톡톡자몽소다','D70937','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw0dbd3bbe/Makeup/RVS/3365440602311_19_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','푸시아 데님','A52477','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw7d069cf8/Makeup/RVS/3365440204362_13_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','핑크 바빌론','E26E6E','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwd13a7c3b/Makeup/RVS/3614270256783_32_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','핑크 까방','D45C74','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw23c3b14d/Makeup/RVS/3614271280299_48_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','스모킹 플럼','8F2740','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwa3d0bf7c/Makeup/RVS/3614271280305_49_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','로즈 생 제르망','D82255','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwf5c51bd1/Makeup/RVS/3614271280312_50_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','푸시아 스틸레토','E71471','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwe171eac1/Makeup/RVS/3614271280336_51_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','로즈 사하리엔느','EF7989','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwa4515b43/Makeup/RVS/3614271280343_52_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','트라페즈 핑크','D86189','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwdc962aa2/Makeup/RVS/3365440237612_14_rouge-volupte-shine_Alt1.jpg?sw=672&sh=888&sm=fit&sfrm=png','코랄 마라케시','DE4A3C','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw5346948b/Makeup/RVS/3365440562141_16_rouge-volupte-shine_Alt1.jpg?sw=672&sh=888&sm=fit&sfrm=png','오랑쥬 마조렐','CF403C','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw34e35bbb/Makeup/RVS/3365440198043_12_rouge-volupte-shine_Alt1.jpg?sw=672&sh=888&sm=fit&sfrm=png','코랄 돌머','E1313E','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwafbff7ee/Makeup/RVS/3614270256745_30_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','코랄 트렌치','F15242','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw04d6c8fd/Makeup/RVS/3614271280121_41_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','코랄 아 뽀르떼','EE6C74','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw8a9d7955/Makeup/RVS/3614271280275_46_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','오랑쥬 뻬르펙토','DA1215','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw7e7980a7/Makeup/RVS/3365440197480_4_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','루쥬 발레','B91A2E','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw6cfb29af/Makeup/RVS/3365440197558_5_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','푸시아 쉬폰','B41E44','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw85238397/Makeup/RVS/3614271280268_45_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','루쥬 턱시도','C30F2A','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='루쥬 볼륍떼 샤인'),'https://www.yslbeautykr.com/dw/image/v2/AAWH_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw24fd4f6d/Makeup/RVS/3614272049352_76_rouge-volupte-shine_Alt1.jpg?sw=355&sh=785&sm=fit&sfrm=png','레드 인 더 라이트','671C23','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','1호 부케누디','CE6C6D','2018-05-12');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','2호 베이지코랄','C86F5F','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','4호 부케로지','C51C3B','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','5호 블루밍로즈','EF2463','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','6호 베이비로즈','F03152','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','7호 키싱유','C32139','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','8호 크레이지레드','C52D53','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','9호 벨벳스칼렛','A92E42','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','10호 클래식버건디','AF4353','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','13호 벨벳로즈','C6495B','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','15호 벨벳코랄','D45F4E','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','16호 매트팝오렌지','E24A33','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','17호 애플바이트','E83A33','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','18호 라이트업','E83A33','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','19호 블러드오렌지','E2323D','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','20호 레드페퍼','BD1C2B','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','21호 레드소울','BD1C2B','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','22호 댄디코랄','C23229','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','23호 브릭로즈','B44A3D','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','24호 넥타코랄','EB524D','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='크리미 틴트 컬러 밤 인텐스'),'http://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/C020/201801/IMG1517EKg150918482.jpg','25호 로지실크','DE4F53','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001486_IM_01.png','PK001 어제보다 로제','DC474B','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001487_IM_01.png','OR202 얼마나 오렌지','D94B37','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001488_IM_01.png','PK003 예리한 핑크','EB313F','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001489_IM_01.png','RD303 워 아이린 레드','BD052B','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001490_IM_01.png','OR201 상큼하조이 자몽','DD010D','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001491_IM_01.png','RD301 준비된 레디 레드','B42E35','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001492_IM_01.png','BR401 오늘은 웬디 브라운','A53C41','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001493_IM_01.png','RD302 슬기로운 버건디','731523','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001494_IM_01.png','PP501 생각보다 자주','A81C37','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001495_IM_01.png','PK002 윙크하는 핑크','F94C52','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='매트 시크 립라커'),'http://image.etude.co.kr//upload/sapimg/600_650001496_IM_01.png','PK004 로맨스엔 로즈','AF4050','2018-05-12');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000546_IM_01.png','OR201 판타망고소다','EF7E33','2018-05-12');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000547_IM_01.png','OR202 새콤레몬소다','EFB550','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000548_IM_01.png','PP501 탱글포도소다','D18DD4','2018-05-12');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000549_IM_01.png','BL601 짜릿밀키소다','D8C7E7','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000550_IM_01.png','PK002 츄잉버블소다','DE1273','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000551_IM_01.png','OR203 버니캐롯소다','E33838','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000552_IM_01.png','RD301 아삭애플소다','C1002C','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000553_IM_01.png','BR401 두근카페인소다','D16654','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='원더 펀 파크 디어 달링 소다 틴트'),'http://image.etude.co.kr//upload/sapimg/600_650000554_IM_01.png','PK003 달콤슈가소다','933350','2018-05-12');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010812_IM_01.png','PK001 해피튜드','E6424B','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010819_IM_01.png','PK002 앤틱로제','D1636C','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010820_IM_01.png','PK003 아이돌핑크','FD4952','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010821_IM_01.png','PK004 썸머펀치','F8455A','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010822_IM_01.png','PK005 콜드베리','E31E4B','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010826_IM_01.png','PK006 청키핑키','E02746','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010827_IM_01.png','PK007 말린꽃갈피','B23945','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010809_IM_01.png','BE101 LA언니','E5877D','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010815_IM_01.png','BE102 건살구라떼','E07E7D','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010810_IM_01.png','OR201 살몬키스','FF7862','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010811_IM_01.png','OR202 슬로우 코랄','EF6757','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010816_IM_01.png','OR203 홍당무당황','F33F1C','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010813_IM_01.png','RD301 하우스 딸기','C50224','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010814_IM_01.png','RD302 단풍로드','CA3829','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010817_IM_01.png','RD303 찰토마토','C91B1D','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010825_IM_01.png','RD304 홍초레드','CA0E2F','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010818_IM_01.png','BR401 젠틀브릭','CD504E','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010824_IM_01.png','BR402 무화과자','AB414F','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010828_IM_01.png','BR403 베이비밤비','912E33','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010823_IM_01.png','PP501 포도두유','BA546A','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010829_IM_01.png','딥 블루','007FC0','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010830_IM_01.png','크러쉬 마젠타','FF3879','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010831_IM_01.png','쥬이시 옐로우','FFC91E','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010832_IM_01.png','뱀파이어 블랙','1A1A22','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650010833_IM_01.png','하이라이트 화이트','ECEBE9','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650001345_IM_01.png','BL601 인어 아가씨','EFF0F7','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650001346_IM_01.png','RD301 장밋빛 인생','E4928E','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='미니 투 매치'),'http://image.etude.co.kr//upload/sapimg/600_650001347_IM_01.png','BE101 골드 만수르','E3B87C','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650010452_IM_01.png','웨딩 뷰티풀 플라워','C93E38','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_657912737_IM_01.png','PK012 홀로그램 인 쥬얼','C55B9D','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011121_IM_01.png','베리 애플 그란데','9E0116','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011122_IM_01.png','베리 베리 머치','B3000A','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011123_IM_01.png','베리 오렌지 드링크','E71F07','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011124_IM_01.png','베리 망고 탱고','DC400F','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011125_IM_01.png','베리 바나나 홈메이드','FD8180','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011126_IM_01.png','베리 키위 톡톡','A3C0A1','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011128_IM_01.png','베리 체리 투 고','BC0B40','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='베리 딜리셔스 컬러 인 리퀴드 립스'),'http://image.etude.co.kr//upload/sapimg/600_650011130_IM_01.png','베리 플럼 스퀴즈','8B0013','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','101 니콜라스','A51942','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','102 로버트','FF3596','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','103 브래드','E56395','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','104 조쉬','F993BB','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','105 블레이크','FA4086','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','106 애덤','FF7E8F','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','108 브로디','D98482','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','109 셔니','FB4650','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','111 리키','FF3EB5','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','201 유안','E2A99E','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','202 듀크','B96756','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','501 에드워드','8D2138','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','502 크루즈','DA4049','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','503 조니','DE424E','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','504 주드','CF5662','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','601 애쉬튼','FF3333','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','602 제이크','F78377','2018-5-16');
-- INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','604 콜린','FFB29A','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','605 오스틴','FE8374','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','606 브룩클린','FF7673','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','607 자레드','EC1F2A','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','608 크리스','F7A4A1','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','610 체이스','FE042C','2018-5-16');
INSERT INTO `itemColors` (`items_id`,`itemPhoto`,`itemColor`,`itemHex`,`itemDate`) VALUES ((SELECT `id` FROM `items` WHERE `itemName`='VDL 페스티벌 립스틱(러브마크)'),'http://image.lgcare.com/vdlWebSrc/upload/product/attach_image/KR38001355_file_name_1489365679212.jpg','611 채닝','FE3760','2018-5-16');
