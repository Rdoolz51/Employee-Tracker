INSERT INTO department (name)
VALUES
('Clothing'),
('Jewelry'),
('Electronics'),
('Outdoor');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 75000.00 ,1),
('Manager', 75000.00 ,2),
('Manager', 75000.00 ,3),
('Manager', 75000.00 ,4),
('Team Member', 30000.00,1),
('Team Member', 30000.00,2),
('Team Member', 30000.00,3),
('Team Member', 30000.00,4),
('New Hire', 25000.00,1),
('New Hire', 25000.00,2),
('New Hire', 25000.00,3),
('New Hire', 25000.00,4);

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