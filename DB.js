Table project {
  id bigint
  name varchar PK
  client varchar
  project_img url
  start_date timestamp
  end_date timestamp
}

Table developer {
  id bigint
  name varchar PK
  overall_score int
}

Table works_on {
  id bigint PK
  developerId bigint
  projectId bigint
  dev_communication_score int
  dev_tech_skills_score int
  dev_teamwork_score int
  comment varchar
}

Table project_evaluation {
  id bigint
  projectId bigint PK
  in_house_evaluation int
  client_evalutaion int
  overall_evalutaion int
  
}

Table user {
  id bigint PK
  name varchar
  password varchar
  related_project bigint
}


Ref: works_on.developerId > developer.id
Ref: works_on.projectId > project.id
Ref: project_evaluation.projectId > project.id
Ref: user.related_project > project.id

https://dbdiagram.io/d/5c754cd8f7c5bb70c72f213a
////////////////////////////////////////////////////////
Developer <--> Project
"project_screen"
SELECT d.id AS dev_id,
d.name AS dev_name,
d.image AS dev_image,
d."position" AS dev_position,
w.dev_communication_score,
w.dev_tech_skills_score,
w.dev_teamwork_score,
p.id AS project_id,
p.start_date,
p.end_date,
p.name AS project_name,
p.client,
p.image,
pe.in_house_evaluation,
pe.client_evaluation
FROM developer d
 JOIN works_on w ON d.id = w.developer_id
 FULL JOIN project p ON w.project_id = p.id
 FULL JOIN project_evaluation pe ON p.id = pe.project_id;