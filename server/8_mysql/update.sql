USE `colorize`;

UPDATE `itemColors`
SET `itemPhoto` = REPLACE(`itemPhoto`, 'http://', '')
WHERE `itemPhoto` LIKE 'http://%'