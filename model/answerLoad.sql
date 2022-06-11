COPY answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/shank/Documents/SDC Application Data/answers.csv'
DELIMITER ','
CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) FROM answers)+1);

ALTER TABLE answers ADD COLUMN datetz DATE;
UPDATE answers SET datetz = to_timestamp(answers.date_written/1000);
ALTER TABLE answers DROP COLUMN date_written;
ALTER TABLE answers RENAME COLUMN datetz TO date_written;