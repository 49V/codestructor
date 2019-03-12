class AddSolutionToCourseProgresses < ActiveRecord::Migration[5.1]
  def change
    add_column :course_progresses, :solution, :string
  end
end
