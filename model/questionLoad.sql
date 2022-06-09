COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/shank/Documents/SDC Application Data/questions.csv'
DELIMITER ','
CSV HEADER;