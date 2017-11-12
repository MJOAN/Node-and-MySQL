DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INTEGER(10) NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30),
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1234, "Programming Pearls", "Books", 15.45, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1342, "Cracking the Code Interview", "Books", 25.10, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1978, "Macbook Pro 15' 2015", "Laptop", 1985.00, 40);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4329, "Macbook Air 13' 2012", "Laptop", 1220.00, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2234, "Pro Tools Studio", "Music Software", 255.10, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8734, "Head First MySQL", "Books", 15.10, 35);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1098, "Galaxy S8", "Phones", 544.54, 140);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9393, "Beginning C++ Programming", "Books", 12.10, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8997, "Python Programming", "Books", 19.10, 40);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4365, "How Computers Work", "Books", 32.10, 35);



/* UPDATE OPTIONS*/
UPDATE stock_quantity SET stock_quantity = stock_quantity - (SELECT SUM(?) FROM products);
UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value];
UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? AND price, [units, item];
