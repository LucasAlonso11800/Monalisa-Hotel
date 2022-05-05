CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRoomCategory`(
	IN	ProomCategoryId	 			int
)
BEGIN
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
	FROM rooms
	JOIN room_categories 
		ON room_categories.room_category_id = room_room_category_id
	JOIN room_prices 
		ON room_prices.room_price_room_category_id = room_category_id
	LEFT JOIN room_reserves 
		ON room_reserves.room_reserve_room_id = room_id
	LEFT JOIN reserves 
		ON reserves.reserve_id = room_reserve_reserve_id
	WHERE room_category_id = ProomCategoryId OR ProomCategoryId IS NULL
	GROUP BY room_category_id;
END