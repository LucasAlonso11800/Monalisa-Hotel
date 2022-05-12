CREATE DEFINER=`root`@`localhost` PROCEDURE `CheckAvailability`(
	IN	Pdate				DATE,
    IN	ProomCategoryId		INT,
    IN	Prooms				INT
)
BEGIN
	DECLARE BtotalRooms INT;
	DECLARE BoccupiedRooms INT;
    DECLARE BavailableRooms INT;
	
    -- Total amount of rooms
    SELECT COUNT(room_id) 
    INTO BtotalRooms
    FROM rooms 
    WHERE room_room_category_id = ProomCategoryId;
    
	-- Occupied rooms at given date
	SELECT COUNT(room_id) 
    INTO BoccupiedRooms
	FROM rooms
	JOIN room_categories 
		ON room_categories.room_category_id = room_room_category_id
	JOIN room_reserves 
		ON room_reserves.room_reserve_room_id = room_id
	JOIN reserves 
		ON reserves.reserve_id = room_reserve_reserve_id
	WHERE Pdate BETWEEN reserve_from_date AND reserve_to_date
    AND room_category_id = ProomCategoryId
	GROUP BY room_category_id;
    
    -- Number of available rooms
    SET BavailableRooms = BtotalRooms - BoccupiedRooms;
    
    -- Not enough rooms
    IF BavailableRooms < Prooms THEN SELECT 0 AS 'code';
	-- Available rooms
    ELSE 
		SELECT
			1 AS 'code',
			room_id as roomId
		FROM rooms
        WHERE room_room_category_id = ProomCategoryId
		AND room_id NOT IN (
			SELECT room_id FROM rooms
			JOIN room_categories 
				ON room_categories.room_category_id = room_room_category_id
			JOIN room_reserves 
				ON room_reserves.room_reserve_room_id = room_id
			JOIN reserves 
				ON reserves.reserve_id = room_reserve_reserve_id
			WHERE Pdate BETWEEN reserve_from_date AND reserve_to_date
			AND room_category_id = ProomCategoryId)
        ORDER BY room_id DESC
        LIMIT Prooms;
    END IF;
END