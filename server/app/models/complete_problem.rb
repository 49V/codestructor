class CompleteProblem < ApplicationRecord
  belongs_to :user
  belongs_to :problem, :dependent => :destroy
end
