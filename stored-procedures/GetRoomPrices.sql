CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRoomPrices`()
BEGIN
	SELECT 
		price_category_id 				AS priceId, 
		price_category_name				AS priceName,
        room_price_room_category_id		AS roomId, 
        room_category_name				AS roomName,
        room_category_passengers		AS roomPassengers,
        room_price_price				AS roomPrice
    FROM price_categories
    JOIN room_prices
		ON room_prices.room_price_price_category_id = price_category_id
	JOIN room_categories
		ON room_categories.room_category_id = room_price_room_category_id;
END