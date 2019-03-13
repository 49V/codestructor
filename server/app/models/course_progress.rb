class CourseProgress < ApplicationRecord
  belongs_to :user
  belongs_to :problem, :dependent => :destroy
  belongs_to :course
end
