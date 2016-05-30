\set min_start_date '2016-08-01T00:00:00-04'
\set max_start_date '2016-08-31T00:00:00-04'
\set project_id 71
\set project_location 'DEN'
\set skill_id 4

SELECT s.name     AS skill_name,
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
WHERE  n.start_date >= :'min_start_date'
  AND  n.start_date <  :'max_start_date'
  AND  p.id = :'project_id'
  AND  p.location = :'project_location'
  AND  s.id = :'skill_id'
ORDER  BY n.start_date, p.id, s.id;