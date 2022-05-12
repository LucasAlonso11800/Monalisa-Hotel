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
	FROM room_categories
	JOIN room_prices 
		ON room_prices.room_price_room_category_id = room_category_id
        AND room_price_price_category_id = (SELECT room_price_price_category_id FROM room_prices ORDER BY room_price_price_category_id DESC LIMIT 1)
	JOIN rooms
		ON rooms.room_room_category_id = room_category_id
	WHERE room_category_id = ProomCategoryId OR ProomCategoryId IS NULL
	GROUP BY room_category_id;
END