CREATE DEFINER=`root`@`localhost` PROCEDURE `GetOccupiedRooms`(
	IN Pdate	DATE
)
BEGIN
	SELECT
		room_category_id 			AS roomId,
		room_category_name 			AS roomName,
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
END