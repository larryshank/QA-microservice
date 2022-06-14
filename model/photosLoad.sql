COPY answers_photos(id, answer_id, url)
FROM '/Users/shank/Documents/SDC Application Data/answers_photos.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('answers_photos', 'id'), (SELECT MAX(id) FROM answers_photos)+1);
