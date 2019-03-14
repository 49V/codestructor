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

teacher1 = User.create!({
  email: 'teach1@er.teacher',
  password: '12345',
  teacher: true
})

teacher2 = User.create!({
  email: 'teach2@er.teacher',
  password: '12345',
  teacher: true
})

course1 = Course.create!({
  name: 'Coding 101', 
  description: 'An introductory course on the basic computational thinking required in order to properly develop basic software.', 
  teacher_id: teacher2.id
})

course2 = Course.create!({
  name: 'Data Structures and Algorithms', 
  description: 'An introduction to fundamental data structures', 
  teacher_id: teacher2.id
})

student1 = User.create!({
  email: 'student1@school.ca',
  password: 'password',
  teacher: false,
})

student2 = User.create!({
  email: 'student2@school.ca',
  password: 'password',
  teacher: false,
})

problem1 = Problem.create!({
  statement: 'Starting from 0, add 1 until you reach 10',
  description: 'A basic loop',
  solution: '10',
  course_id: course1.id 
})

problem2 = Problem.create!({
  statement: 'Starting from 0,add 1 on every odd iteration',
  description: 'A complex loop',
  solution: '5',
  course_id: course1.id 
})

problem3 = Problem.create!({ 
  statement: 'Reliably guess a number between 1 and 1000',
  description: 'Binary Search',
  solution: '24',
  course_id: course2.id 
})

student1.courses << Course.find(course1.id)
student2.courses << Course.find(course2.id)
