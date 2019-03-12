class CreateCourseProgresses < ActiveRecord::Migration[5.1]
  def change
    create_table :course_progresses do |t|
      t.references :user, foreign_key: true
      t.references :problem, foreign_key: true
      t.references :course, foreign_key: true

      t.timestamps
    end
  end
end
