COPY answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/shank/Documents/SDC Application Data/answers.csv'
DELIMITER ','
CSV HEADER;