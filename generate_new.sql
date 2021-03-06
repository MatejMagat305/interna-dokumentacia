BEGIN ISOLATION LEVEL READ COMMITTED;


TRUNCATE TABLE
    backlog, branches, cancel_signs, cities, departments, divisions, document_signatures,
    documents, employees, imports, online_training_signatures, online_trainings
    RESTART IDENTITY CASCADE;

CREATE or replace FUNCTION random_timestamp() RETURNS timestamp
    LANGUAGE SQL AS
$$
SELECT random() * (current_timestamp - timestamp '2017-01-01') + timestamp '2017-01-01'
$$;

CREATE or replace FUNCTION br() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 5
$$;
CREATE or replace FUNCTION di() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 5
$$;
CREATE or replace FUNCTION de() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 5
$$;
CREATE or replace FUNCTION ci() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 5
$$;
CREATE or replace FUNCTION em() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 50
$$;
CREATE or replace FUNCTION ma() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 10
$$;
CREATE or replace FUNCTION doc() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 100
$$;
CREATE or replace FUNCTION tr() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT 100
$$;

CREATE or replace FUNCTION get_manager_id(e_id integer) RETURNS integer
    LANGUAGE SQL AS
$$
SELECT manager_id
FROM employees
WHERE employees.id = e_id
$$;

CREATE or replace FUNCTION random(num integer) RETURNS integer
    LANGUAGE SQL AS
$$
SELECT floor(random() * num)::integer + 1
$$;

CREATE or replace FUNCTION total_signatures() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT (em() * doc())::integer
$$;

CREATE or replace FUNCTION random_assigment() RETURNS varchar
    LANGUAGE SQL AS
$$
SELECT '' || floor(random(br())) || '; ' || -- branch
       floor(random(ci())) || '; ' || -- city
       floor(random(de())) || '; ' || -- department
       floor(random(di())) -- division
$$;

CREATE or replace FUNCTION random_sent_doc() RETURNS integer
    LANGUAGE SQL AS
$$
SELECT id
from documents
where edited = false
order by random()
limit 1
$$;

INSERT INTO branches
SELECT id, 'branch_' || id
FROM generate_series(1, br()) AS seq(id);
INSERT INTO cities
SELECT id, 'city_' || id
FROM generate_series(1, ci()) AS seq(id);
INSERT INTO divisions
SELECT id, 'division_' || id
FROM generate_series(1, di()) AS seq(id);
INSERT INTO departments
SELECT id, 'department_' || id
FROM generate_series(1, de()) AS seq(id);
INSERT INTO imports
SELECT id, 'import_' || id
FROM generate_series(1, 5) AS seq(id);

INSERT INTO employees
SELECT id,
       'first_name_' || id,
       'last_name_' || id,
       id,                                              -- login
       id,                                              -- passwd
       'role_' || id,
       'email' || id || '@gefco.sk',
       'job_title_' || id,
       random(ma()),
       random(br()),
       random(di()),
       random(de()),
       random(ci()),
       case random(20) when 1 then true else false end, -- deleted 5%
       random(5)                                        -- import_id
FROM generate_series(1, em()) AS seq(id);

UPDATE employees
SET role = 'admin'
WHERE id = 1;

INSERT INTO documents
SELECT id,
       'name_' || id,
       'www.google.com',
       'note_' || id,                                          -- type
       case random(2) when 1 then 'note_' || id else null end, -- note
       random_timestamp(),                                     -- release_date
       random_timestamp(),                                     -- todo deadline
       random(5),                                              -- todo order number
       'v' || random(3),                                       -- todo version
       null,                                                   -- todo prev_version
       '' || floor(random(br())) || '; ' || -- branch
       floor(random(ci())) || '; ' || -- city
       floor(random(de())) || '; ' || -- department
       floor(random(di())),                                    -- division
       case random(2) when 1 then true else false end,         -- training 50%
       case random(2) when 1 then true else false end,          -- edited 50%
       case random(2) when 1 then true else false end           -- old
FROM generate_series(1, doc()) AS seq(id);

INSERT INTO document_signatures
SELECT id,
       random(em()),
       case random(3) when 1 then null else random_timestamp() end, -- e_date 66%
       null,                                                        -- manager_id
       null,                                                        -- s_date
       random_sent_doc()
FROM generate_series(1, total_signatures()) AS seq(id)
ON CONFLICT DO NOTHING;;

UPDATE document_signatures ds
SET superior_id = get_manager_id(employee_id),
    s_date      = case random(3) when 1 then null else random_timestamp() end
WHERE (select d.require_superior from documents d where ds.document_id = d.id);

INSERT INTO online_trainings
SELECT id,
       'name_' || id,
       'lector_' || id,
       'agency_' || id,
       'place_' || id,
       random_timestamp(),
       id,
       'agenda_' || id,
       random_timestamp(), 'null',
       case random(2) when 1 then true else false end          -- edited 50%
FROM generate_series(1, tr()) AS seq(id);


UPDATE online_trainings
SET deadline = date + interval '3 days'
WHERE id != 0;


INSERT INTO online_training_signatures
SELECT id,
       random(tr()),
       random(em()),
       case random(2) when 1 then random_timestamp() end
FROM generate_series(1, tr()) AS seq(id)
ON CONFLICT DO NOTHING;

INSERT INTO cancel_signs
SELECT random(total_signatures()), random_timestamp()
FROM generate_series(1, 100) AS seq(id)
ON CONFLICT DO NOTHING;;


SELECT setval('backlog_id_seq',
    (SELECT coalesce(max(id), 1) FROM backlog));

SELECT setval('branches_id_seq',
    (SELECT coalesce(max(id), 1) FROM branches));

SELECT setval('cities_id_seq',
    (SELECT coalesce(max(id), 1) FROM cities));

SELECT setval('departments_id_seq',
    (SELECT coalesce(max(id), 1) FROM departments));

SELECT setval('divisions_id_seq',
    (SELECT coalesce(max(id), 1) FROM divisions));

SELECT setval('document_signatures_id_seq',
    (SELECT coalesce(max(id), 1) FROM document_signatures));

SELECT setval('documents_id_seq',
    (SELECT coalesce(max(id), 1) FROM documents));

SELECT setval('employees_id_seq',
    (SELECT coalesce(max(id), 1) FROM employees));

SELECT setval('document_signatures_id_seq',
    (SELECT coalesce(max(id), 1) FROM document_signatures));

SELECT setval('imports_id_seq',
    (SELECT coalesce(max(id), 1) FROM imports));

SELECT setval('online_training_signatures_id_seq',
              (SELECT coalesce(max(id), 1) FROM online_training_signatures));

SELECT setval('online_trainings_id_seq',
              (SELECT coalesce(max(id), 1) FROM online_trainings));

COMMIT;
-- rollback
