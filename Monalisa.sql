CREATE DATABASE IF NOT EXISTS monalisa;
USE monalisa;

CREATE TABLE `rooms` (
  `room_id` int PRIMARY KEY AUTO_INCREMENT,
  `room_room_category_id` int,
  `room_number` int UNIQUE,
  `room_status` varchar(255)
);

CREATE TABLE `room_categories` (
  `room_category_id` int PRIMARY KEY AUTO_INCREMENT,
  `room_category_name` varchar(255),
  `room_category_description` varchar(255),
  `room_category_image` varchar(255),
  `room_category_slug` varchar(40),
  `room_category_passengers` int,
  `room_category_beds` int,
  `room_category_deposit` int
);

CREATE TABLE `amenities` (
  `ameniti_id` int PRIMARY KEY AUTO_INCREMENT,
  `ameniti_name` varchar(255)
);

CREATE TABLE `room_amenities` (
  `room_ameniti_room_id` int,
  `room_ameniti_ameniti_id` int,
  `room_ameniti_status` varchar(255),
  PRIMARY KEY (`room_ameniti_room_id`, `room_ameniti_ameniti_id`)
);

CREATE TABLE `price_categories` (
  `price_category_id` int PRIMARY KEY AUTO_INCREMENT,
  `price_category_name` varchar(255)
);

CREATE TABLE `room_prices` (
  `room_price_room_category_id` int,
  `room_price_price_category_id` int,
  `room_price_price` int,
  PRIMARY KEY (`room_price_room_category_id`, `room_price_price_category_id`)
);

CREATE TABLE `reserves` (
  `reserve_id` int PRIMARY KEY AUTO_INCREMENT,
  `reserve_total_price` int,
  `reserve_from_date` date,
  `reserve_to_date` date,
  `reserve_status` varchar(255),
  `reserve_passengers` int,
  `reserve_owner_name` varchar(255),
  `reserve_owner_id` varchar(255),
  `reserve_owner_phone` int,
  `reserve_owner_email` varchar(255)
);

CREATE TABLE `room_reserves` (
  `room_reserve_id` int PRIMARY KEY AUTO_INCREMENT,
  `room_reserve_room_id` int,
  `room_reserve_reserve_id` int
);

CREATE TABLE `testimonials` (
  `testimonial_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `testimonial_name` VARCHAR(45) NOT NULL,
  `testimonial_rating` INT NOT NULL,
  `testimonial_text` VARCHAR(255) NOT NULL
);

ALTER TABLE `rooms` ADD FOREIGN KEY (`room_room_category_id`) REFERENCES `room_categories` (`room_category_id`);

ALTER TABLE `room_amenities` ADD FOREIGN KEY (`room_ameniti_room_id`) REFERENCES `rooms` (`room_id`);

ALTER TABLE `room_amenities` ADD FOREIGN KEY (`room_ameniti_ameniti_id`) REFERENCES `amenities` (`ameniti_id`);

ALTER TABLE `room_prices` ADD FOREIGN KEY (`room_price_room_category_id`) REFERENCES `room_categories` (`room_category_id`);

ALTER TABLE `room_prices` ADD FOREIGN KEY (`room_price_price_category_id`) REFERENCES `price_categories` (`price_category_id`);

ALTER TABLE `room_reserves` ADD FOREIGN KEY (`room_reserve_room_id`) REFERENCES `rooms` (`room_id`);

ALTER TABLE `room_reserves` ADD FOREIGN KEY (`room_reserve_reserve_id`) REFERENCES `reserves` (`reserve_id`);
