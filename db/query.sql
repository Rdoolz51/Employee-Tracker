SELECT e.first_name, e.last_name, r.salary
FROM employee e 
JOIN role r 
ON e.role_id=r.id;
