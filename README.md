# README - Codestructor 

## Screenshots
!["Welcome to Codestructor:"]()

!["Student Courses:"]()
!["Course Problems:"]()
!["Solution with Code:"]()


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

* Rails 4.2 [Rails Guide](http://guides.rubyonrails.org/v4.2/)
* PostgreSQL 9.x
* Stripe

