CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRoomCategory`(
	IN	ProomCategoryId	 			INT,
    IN	Pdate						CHAR(10)
)
BEGIN
DROP TABLE IF EXISTS rooms2;
DROP TABLE IF EXISTS occupied_rooms;

CREATE TEMPORARY TABLE rooms2 (
	roomId				INT, 
    roomName			VARCHAR (40), 
    roomDescription		VARCHAR (255), 
    roomImage			VARCHAR (255), 
    roomDeposit			INT, 
    roomSlug			VARCHAR (40), 
    roomBeds			INT, 
    roomPassengers		INT, 
    roomMinimumPrice	INT, 
    roomTotalRooms		INT
);
CREATE TEMPORARY TABLE occupied_rooms (
	roomId 	 			INT, 
    roomOccupiedRooms 	INT
);

-- Select room info
INSERT INTO rooms2
SELECT 
	room_category_id 			AS roomId,
	room_category_name 			AS roomName,
	room_category_description 	AS roomDescription,
	room_category_image			AS roomImage,
	room_category_deposit		AS roomDeposit,
	room_category_slug			AS roomSlug,
	room_category_beds			AS roomBeds,
	room_category_passengers	AS roomPassengers,
	MIN(room_price_price) 		AS roomMinimumPrice,
	COUNT(room_id)				AS roomTotalRooms
FROM room_categories
JOIN room_prices 
	ON room_prices.room_price_room_category_id = room_category_id
	AND room_price_price_category_id = (SELECT room_price_price_category_id FROM room_prices ORDER BY room_price_price_category_id DESC LIMIT 1)
JOIN rooms
	ON rooms.room_room_category_id = room_category_id
WHERE room_category_id = ProomCategoryId OR ProomCategoryId IS NULL
GROUP BY room_category_id;

-- Select occupied rooms number
INSERT INTO occupied_rooms
SELECT
	room_category_id 			AS roomId,
	COUNT(room_id)				AS roomOccupiedRooms
FROM rooms
JOIN room_categories 
	ON room_categories.room_category_id = room_room_category_id
JOIN room_reserves 
	ON room_reserves.room_reserve_room_id = room_id
JOIN reserves 
	ON reserves.reserve_id = room_reserve_reserve_id
WHERE Pdate BETWEEN reserve_from_date AND reserve_to_date
GROUP BY room_category_id;

-- Select complete room info
SELECT 
	r2.roomId, 
    roomName, 
    roomDescription, 
    roomImage, 
    roomDeposit, 
    roomSlug, 
    roomBeds, 
    roomPassengers, 
    roomMinimumPrice, 
    roomTotalRooms,
    ifnull(roomOccupiedRooms, 0) AS roomOccupiedRooms
FROM rooms2 r2
LEFT JOIN occupied_rooms
ON r2.roomId = occupied_rooms.roomId;
END