class CourseProgress < ApplicationRecord
  belongs_to :user
  belongs_to :problem
  belongs_to :course
end
