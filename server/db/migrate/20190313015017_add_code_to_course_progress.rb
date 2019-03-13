class AddCodeToCourseProgress < ActiveRecord::Migration[5.1]
  def change
    add_column :course_progresses, :code, :string
  end
end
