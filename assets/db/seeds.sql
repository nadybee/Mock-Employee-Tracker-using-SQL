INSERT INTO department (department_name)
VALUES ('marketing'),
        ('Product'),
        ('development'),
        ('growth'),
        ('C-Suite');


INSERT INTO roles (job_title, department_name, salary)
VALUES ('CEO', 'C-Suite', 10000),
        ('CPO', 'Product', 8000),
        ('CFO', 'Development', 8000),
        ('Head of Growth', 'growth', 8000),
        ('Head of Marketing', 'marketing', 8000);

INSERT INTO employees (first_name, last_name, job_title, department_name, salary, manager )        

   VALUES ('Jason', 'Fairbourne', 'CEO', 'C-Suite', 10000, 'none'),
         ('Natalie', 'Fairbourne', 'CPO', 'Product', 8000, 'Jason Fairbourne'),
        ('Jeremy', 'Robertson', 'CFO', 'Development', 8000, 'none');