class Problem < ApplicationRecord
  belongs_to :course
  has_many :complete_problem, :dependent => :destroy
  has_many :course_progress, :dependent => :destroy
end
