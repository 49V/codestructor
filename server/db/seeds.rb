# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
unless Rails.env.development?
  exit 0
end

User.destroy_all

teacher = User.create!({
  email: 'teach@er.teacher',
  password: '12345',
  teacher: true
})

course1 = Course.create!({
  name: 'course1', 
  description: 'an intro course', 
  teacher_id: teacher.id
})

student1 = User.create!({
  email: 'student1@school.ca',
  password: 'password',
  teacher: false,
})

problem1 = Problem.create!({
  statement: 'A basic problem.',
  description: 'not too difficult',
  solution: '0',
  course_id: course1.id 
})

student1.courses << Course.find(course1.id)
