# README - Codestructor 

## Screenshots
!["Welcome to Codestructor:"](https://github.com/giffin94/codestructor/blob/master/client/public/Screenshot%20from%202019-03-21%2017-00-57.jpg?raw=true)

!["Student Courses:"](https://github.com/giffin94/codestructor/blob/master/client/public/Screenshot%20from%202019-03-21%2019-35-39.jpg?raw=true)

!["Course Problems:"](https://github.com/giffin94/codestructor/blob/master/client/public/Screenshot%20from%202019-03-21%2019-35-56.jpg?raw=true)

!["Solution with Code:"](https://github.com/giffin94/codestructor/blob/master/client/public/Screenshot%20from%202019-03-21%2019-37-20.jpg?raw=true)

## Setup

1. Fork & Clone
2. Navigate to codestructor/client
3. Run `npm install` to install dependencies
4. Navigate to codestructor/server
5. Run `bundle install` to install dependencies
6. Create `config/database.yml` by copying `config/database.example.yml`
7. Create `config/secrets.yml` by copying `config/secrets.example.yml`
8. Run `bin/rake db:reset` to create, load and seed db
9. Navigate to codestructor/server
10. Run `bin/rails s -b 0.0.0.0 -p 3001` to start the server
11. Navigate to codestructor/client
12. Run `npm start` to start the client 

## Dependencies

* axios 0.17.1
* Node-Blockly 1.0.35
* Node-Sass 4.11.0
* ReactJS 16.5.2
* Regenerator Runtime

* Rails 5.1.6
* PostgreSQL 0.18
* rack-cors 