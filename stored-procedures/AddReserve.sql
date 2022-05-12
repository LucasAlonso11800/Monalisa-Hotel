CREATE DEFINER=`root`@`localhost` PROCEDURE `AddReserve`(
	IN Ptotal		INT,
    IN PfromDate	DATE,
    IN PtoDate		DATE,
    IN Ppassengers	INT,
    IN PfirstName	VARCHAR(40), 
	IN PlastName 	VARCHAR(40), 
    IN Pemail		VARCHAR(100), 
    IN Pcountry		VARCHAR(40), 
	IN Pphone		INT, 
    IN Pzip			VARCHAR(20), 
    IN Pnotes		TEXT
)
BEGIN
	INSERT INTO reserves
    (reserve_total_price, reserve_from_date, reserve_to_date, reserve_passengers, reserve_owner_name, reserve_owner_phone, reserve_owner_email, reserve_owner_last_name, reserve_owner_country, reserve_owner_zip, reserve_owner_notes, reserve_status)
    VALUES (Ptotal, PfromDate, PtoDate, Ppassengers, PfirstName, Pphone, Pemail, PlastName, Pcountry, Pzip, Pnotes, "R");
	SELECT last_insert_id() AS reserveId;
END