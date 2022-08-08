INSERT INTO department (name)
VALUES
('Clothing'),
('Jewelry'),
('Electronics'),
('Outdoor');

INSERT INTO role (title, salary, department_id)
VALUES
('Clothing Manager', 75000.00 ,1),
('Jewelry Manager', 75000.00 ,2),
('Electronics Manager', 75000.00 ,3),
('Outdoor Manager', 75000.00 ,4),
('Clothing Associate', 30000.00,1),
('Jewelry Associate', 30000.00,2),
('Electronics Associate', 30000.00,3),
('Outdoor Associate', 30000.00,4),
('Clothing New Hire', 25000.00,1),
('Jewelry New Hire', 25000.00,2),
('Electronics New Hire', 25000.00,3),
('Outdoor New Hire', 25000.00,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John','Felix',1,null),
('Russel','Townson',2,null),
('Amy','Shoven',3,null),
('Tiffany','Sandusky',4,null),
('Robert','Fowler',6,2),
('Theresa','Summit',5,1),
('Adam','Dunlap',8,4),
('Nichole','Albertson',5,1),
('DeMarco','Sutten',6,2),
('Ruth','Peters',7,3),
('Eric','Dauble',7,3),
('Lisa','Brown',8,4);