\set skill_id NULL
-- \set skill_id 4

\set project_id NULL
-- \set project_id 71

\set project_location NULL
-- \set project_location 'DEN'

\set min_start_date NULL
-- \set min_start_date '2016-08-01 00:00:00-04'

\set max_start_date NULL
-- \set max_start_date '2016-08-31 00:00:00-04'

-- Only able to make the conditional clauses work with interger variables.
-- String and date variables are giving syntax errors.
SELECT s.id       AS skill_id,
       s.name     AS skill_name,
       p.id       AS project_id,
       p.name     AS project_name,
       p.location AS project_location,
       n.start_date,
       n.end_date,
       per.name   AS assignment
FROM   needs n
       LEFT OUTER JOIN skills s
                    ON n.skill_id = s.id
       LEFT OUTER JOIN projects p
                    ON n.project_id = p.id
       LEFT OUTER JOIN people per
                    ON n.person_id = per.id
WHERE  (:skill_id IS NULL OR n.skill_id = :skill_id)
  AND  (:project_id IS NULL OR n.project_id = :project_id)
  -- AND  (:'project_location' IS NULL OR p.location = :'project_location')
  -- AND  (:'min_start_date' IS NULL OR n.start_date >= :'min_start_date')
  -- AND  (:'max_start_date' IS NULL OR n.start_date <  :'max_start_date')
ORDER  BY n.start_date, p.id, s.id;
