class CreateProblems < ActiveRecord::Migration[5.1]
  def change
    create_table :problems do |t|
      t.text        :statement
      t.text        :description
      t.text        :solution
      t.references  :course

      t.timestamps
    end
  end
end
