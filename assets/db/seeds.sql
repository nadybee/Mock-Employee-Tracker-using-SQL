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
        ('Head of Marketing',8000, 'marketing', 1);

  

INSERT INTO employees (first_name, last_name, job_title, role_id, department_name, salary, manager )        

   VALUES ('Jason', 'Fairbourne', 'CEO', 1, 'c-Suite', 10000, 'none'),
         ('Natalie', 'Fairbourne', 'CPO', 2, 'product', 8000, 'Jason Fairbourne'),
        ('Jeremy', 'Robertson', 'CFO', 3, 'development', 8000, 'none');

  