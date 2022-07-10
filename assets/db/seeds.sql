INSERT INTO department (department_name)
VALUES ('marketing'),
        ('product'),
        ('development'),
        ('growth'),
        ('accounting'),
        ('c-Suite');


INSERT INTO roles (job_title, salary, department_name, department_id)
VALUES ('CEO', 10000, 'C-Suite', 6),
        ('CPO', 8000, 'Product', 2),
        ('CFO', 8000, 'accounting', 5),
        ('Head of Growth', 8000, 'growth', 4),
        ('Head of Marketing',8000, 'marketing', 1),
         ('developer',6000, 'development', 3),
          ('content creator', 6000, 'marketing', 1),
           ('book keeper', 6000, 'accounting', 5);

  

INSERT INTO employees (first_name, last_name, job_title, role_id, department_name, salary, manager )        

   VALUES ('Jason', 'Fairbanks', 'CEO', 1, 'c-Suite', 10000, 'none'),
         ('Natalie', 'Pope', 'CPO', 2, 'product', 8000, 'Jason'),
        ('Jeremy', 'Roberts', 'CFO', 3, 'development', 8000, 'none'),
        ('Everett', 'London', 'content creator', 1, 'marketing', 6000, 'Jason'),
        ('Kyle', 'Hansen', 'developer', 3, 'development', 8000, 'Jeremy'),
        ('Westin', 'Fields', 'Head of Marketing', 1, 'marketing', 8000, 'Jason'),
        ('Taylor', 'Preston', 'Head of Growth', 4, 'growth', 8000, 'Natalie');

  