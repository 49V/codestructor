class User < ApplicationRecord
  has_secure_password
  has_many :created_courses, class_name: 'Course', foreign_key: 'teacher_id'
  has_and_belongs_to_many :courses
end
