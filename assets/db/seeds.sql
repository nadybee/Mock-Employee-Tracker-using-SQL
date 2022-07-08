INSERT INTO department (department_name)
VALUES ('marketing'),
        ('Product'),
        ('development'),
        ('growth'),
        ('C-Suite');


INSERT INTO roles (job_title, salary, department_id)
VALUES ('CEO', 10000, 5),
        ('CPO', 8000, 2),
        ('CFO', 8000, 3),
        ('Head of Growth', 8000, 4),
        ('Head of Marketing',8000, 1);

INSERT INTO employees (first_name, last_name, job_title, department_name, salary, manager )        

   VALUES ('Jason', 'Fairbourne', 'CEO', 'C-Suite', 10000, 'none'),
         ('Natalie', 'Fairbourne', 'CPO', 'Product', 8000, 'Jason Fairbourne'),
        ('Jeremy', 'Robertson', 'CFO', 'Development', 8000, 'none');