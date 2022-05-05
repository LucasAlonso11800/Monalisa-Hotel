CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTestimonials`()
BEGIN
	SELECT
		testimonial_id 		AS testimonialId,
        testimonial_name 	AS testimonialName,
        testimonial_text 	AS testimonialText,
        testimonial_rating 	AS testimonialRating
    FROM testimonials;
END