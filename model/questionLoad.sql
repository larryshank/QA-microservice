COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/shank/Documents/SDC Application Data/questions.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions)+1);

ALTER TABLE questions ADD COLUMN datetz DATE;
UPDATE questions SET datetz = to_timestamp(questions.date_written/1000);
ALTER TABLE questions DROP COLUMN date_written;
ALTER TABLE questions RENAME COLUMN datetz TO date_written;