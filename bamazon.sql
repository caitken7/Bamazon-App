DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE bamazonTable (
  item_id INTEGER(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT(50) NOT NULL,
  stock_quantity INT(50) NOT NULL
);

TRUNCATE TABLE bamazonTable;

SELECT * FROM bamazonTable;

INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
values ('Fidget Spinner', 'Toys', 4, 10042), 
('Gibson Les Paul', 'Musical Instruments', 1600, 17), 
('Bamazon Firestick', 'Electronics', 40, 2000), 
('Foam Roller', 'Sports & Outdoors', 25, 352), 
('Echo Dot', 'Electronics', 50, 2300), 
('Vitamix Blender', 'Home and Kitchen', 320, 238), 
('ShureSM57 Microphone', 'Recording Equipment', 100, 46), 
('Swingline Stapler', 'Office Products', 12, 258), 
('Rick & Morty: Season 1 Blueray', 'Movies and TV', 21, 254), 
('Keurig', 'Home and Kitchen', 92, 185);

-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Fidget Spinner', 'Toys', 4, 10042);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Gibson Les Paul', 'Musical Instruments', 1600, 17);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Bamazon Firestick', 'Electronics', 40, 2000);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Foam Roller', 'Sports & Outdoors', 25, 352);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Echo Dot', 'Electronics', 50, 2300);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Vitamix Blender', 'Home and Kitchen', 50, 238);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('ShureSM57 Microphone', 'Recording Equipment', 100, 46);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Swingline Stapler', 'Office Products', 12, 258);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Rick & Morty: Season 1 Blueray', 'Movies and TV', 21, 254);
-- 
-- INSERT INTO bamazonTable (product_name, department_name, price, stock_quantity) 
-- values ('Keurig', 'Home and Kitchen', 92, 185);
-- 




-- SELECT top5000.position AS songPosition, top_albums.position AS albumPosition, top5000.artist, top5000.song, top_albums.album, top5000.year
-- FROM top_albums
-- INNER JOIN top5000 ON top5000.artist = top_albums.artist AND top5000.year = top_albums.year;