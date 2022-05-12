CREATE DEFINER=`root`@`localhost` PROCEDURE `AddRoomReserve`(
	IN roomId		INT,
    IN reserveId	INT
)
BEGIN
	INSERT INTO room_reserves (room_reserve_room_id, room_reserve_reserve_id)
    VALUES (roomId, reserveId);
END