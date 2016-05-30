-- Drop join tables
DROP TABLE IF EXISTS people_skills;

-- Drop foreign keys
ALTER TABLE needs
  DROP CONSTRAINT needs_person_id_foreign,
  DROP CONSTRAINT needs_project_id_foreign,
  DROP CONSTRAINT needs_skill_id_foreign;

ALTER TABLE projects
  DROP CONSTRAINT projects_companies_id_foreign;

-- Drop tables
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS needs;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;

-- Create tables
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE needs (
  id SERIAL PRIMARY KEY,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,

  person_id INTEGER,
  project_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL
);

CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  email VARCHAR(64),
  phone VARCHAR(32)
);

CREATE TABLE people_skills (
  person_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  PRIMARY KEY (person_id, skill_id)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  location VARCHAR(3) NOT NULL,

  company_id INTEGER NOT NULL
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

-- Add foreign keys
-- needs -> person
ALTER TABLE needs
  ADD CONSTRAINT needs_person_id_foreign FOREIGN KEY (person_id)
  REFERENCES people (id);

-- needs -> project
ALTER TABLE needs
  ADD CONSTRAINT needs_project_id_foreign FOREIGN KEY (project_id)
  REFERENCES projects (id);

-- needs -> skill
ALTER TABLE needs
  ADD CONSTRAINT needs_skill_id_foreign FOREIGN KEY (skill_id)
  REFERENCES skills (id);

-- projects -> company
ALTER TABLE projects
  ADD CONSTRAINT projects_companies_id_foreign FOREIGN KEY (company_id)
  REFERENCES companies (id);

-- people_skills -> people
ALTER TABLE people_skills
  ADD CONSTRAINT people_skills_person_id_foreign FOREIGN KEY (person_id)
  REFERENCES people (id);

-- people_skills -> skills
ALTER TABLE people_skills
  ADD CONSTRAINT people_skills_skill_id_foreign FOREIGN KEY (skill_id)
  REFERENCES skills (id);
