DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL auto_increment,
product_name tinytext null,
department_name tinytext null,
price DECIMAL(10,2) null,
stock_quantity int null,
primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
value("iPad Mini 5", "Electronics", 399.99, 1), ("Apple", "Food", 0.35, 10), ("Skateboard", "Transportation", 19.99, 6), ("Cookies", "Food", 3.00, 10), ("Vitamin C Gummi", "Health", 15.00, 3), ("Laptop", "Electronics", 899.99, 0), ("Cup", "Kitchen Ware", 2.00, 7), ("Pen", "Office", 0.99, 5), ("Meachanical Keyboard", "Gaming", 59.99, 2), ("Nintendo Switch", "Gaming", 299.99, 0);

select * from products;