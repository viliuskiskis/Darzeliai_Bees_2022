# Kindergarten information system

Vocational school project designed for learning purposes. 
Developed system registers and processes children's requests to the kindergarten. A child is allocated a place at a kindergarten or a place in a waiting list depending on pre-determined criteria.

System user roles and their authorities:

| ROLES | AUTHORITIES |
| --- | --- |
| ADMIN |  create user, delete user, reset user password, lock application queue editing for manager, review system logs, update own account |
|MANAGER | create a kindergarten, update kindergarten, start/ stop application submission, deactivate users' applications before approval (if not locked by admin), process applications queue, confirm applications queue, update own account |
| USER | submit an application (if not locked by manager), review submitted applications and their status, submit/ review pdf documents, delete application, get user data, update and delete own account |

#### Technologies used: 
- React 17.0.1,  Boostrap 5.1.3
- Spring Boot 2.6.0, Java 11
- Spring security
- H2 database
- Apache Tomcat 9.0.40 server
- Swagger-UI, Maven
- Selenium 3.141.59
- TestNG 

#### Design previews:

ADMIN pages: https://agn709575.invisionapp.com/console/share/VM26ELGVGT/550993621

MANAGER pages: https://agn709575.invisionapp.com/console/share/JB26EZTCR9/550996106

USER pages: https://agn709575.invisionapp.com/console/share/GB26F5SD2U/550996143

#### Link to website:

https://bees.akademijait.vtmc.lt/darzelis/login

<sub>*actual pages may differ to a degree from the initial designs<sub>

## Getting Started

- to run manually - follow bash files runViaTomcat.sh or runViaSpringYarn.sh

### Run on Tomcat Server

- edit as needed and run bash script runViaTomcat.sh, takes ~ 30min

### Run with Spring boot and npm/yarn

- edit as needed and run bash script runViaSpringYarn.sh, takes ~ 10min

### Accessing the database

http://localhost:8081/darzelis/console

```
JDBC URL:jdbc:h2:~/tmp/neverLatte1.db
User Name:sa
Password:

```

### Accessing API documentation

http://localhost:8081/darzelis/swagger-ui/


## Running the tests

- for smoke tests, run smoke.xml
- for regression tests, run regression.xml

### Break down into end to end tests

There are 7 different test packages: adminTests, specialistTests, parentTests, login, smokeTests, generalMethods and basetest. First 3 are the main ones, generalMethods holds reusable code for different test cases and basetest is for set up (getting Chrome driver and application link) and closing all tests after running them.

```
adminTests package tests:
- create and delete new user (all three roles)
- update admin details (change user information, password, reset password)

specialistTests package tests:
- create and delete new kindergarten
- update specialist details (change user information, password, reset password)

parentPages package tests:
- submit and delete new application
- update parent details (change user information, password, reset password)
- upload medical document (pdf)

```

## Deployment

To make a war file for deployment:
- run `mvn clean install` while in the project folder `.../Projektas_Darzeliu_IS/back`
- `darzelis.war` file will appear in the `..\Projektas_Darzeliu_IS\back\target` folder


## Authors
List of [contributors](https://github.com/viliuskiskis/Darzeliai_Bees_2022/graphs/contributors) who participated in this project.
Copyright ©️ 2022, Bees

This project is forked from: https://github.com/JurgitaVisa/Projektas_Darzeliu_IS
List of [contributors](https://github.com/JurgitaVisa/Projektas_Darzeliu_IS/graphs/contributors) who participated in this project.
