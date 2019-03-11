POST: /addUser
{
    "userName": "username",
    "password": "userpassword",
    "relatedProject": 2 //optional
}

GET: /getToken
params: username, password

POST: /addDeveloper
{
    "name": "devName",
    "image": "https://static.thenounproject.com/png/17241-200.png", //optional
    "position": "Android developer"
}

GET: /getDeveloperById
params: id

GET: /getAllDevelopers
params: --

POST: /assignDeveloper
{
    "developerId": 5,
    "projectId": 1
}

POST: /addProject
{
    "name": "projectName",
    "client": "clientName",
    "startDate": "timeStampWithoutZone",
    "endDate": "timeStampWithoutZone",
    "image": "url"
}

GET: /getProjectById
params: id

GET: /getAllprojects 
params: --

GET: /getProjectScreen
params: id

POST: /evaluateDeveloperOnProject
{
    "projectId": 4,
    "developerId":2,
    "communication":5,
    "techSkill":10,
    "teamwork":100
}

POST: /evaluateDeveloperOverallscore
{
    "developerId":2,
    "overallScore":5
}

POST:/evaluateProject
{
    "projectId":1,
    "evaluationScore": 50,
    "evaluationType": 1 //1= in-house valuation, 2=client evaluation
}