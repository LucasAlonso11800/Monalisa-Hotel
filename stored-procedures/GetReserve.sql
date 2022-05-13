CREATE DEFINER=`root`@`localhost` PROCEDURE `GetReserve`(
	IN PreserveId	INT
)
BEGIN
	SELECT
		reserve_id					AS reserveId, 
        reserve_total_price			AS reservePrice, 
        reserve_from_date			AS reserveFrom, 
        reserve_to_date				AS reserveTo, 
        reserve_passengers			AS reservePassengers, 
        reserve_owner_name			AS reserveOwner,
        COUNT(room_reserve_room_id) AS reserveRooms
	FROM reserves
    JOIN room_reserves
		ON room_reserves.room_reserve_reserve_id = reserve_id
    WHERE reserve_id = PreserveId
    GROUP BY reserve_id;
END