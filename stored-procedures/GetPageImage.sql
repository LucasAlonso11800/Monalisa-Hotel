CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPageImage`(
	IN Pname 	VARCHAR(45)
)
BEGIN
	SELECT 
		page_image_id		AS pageImageId, 
        page_image_page		AS pageImagePage, 
        page_image_url		AS pageImageURL
	FROM page_images
    WHERE page_image_page = Pname;
END