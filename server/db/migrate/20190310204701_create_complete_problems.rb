class CreateCompleteProblems < ActiveRecord::Migration[5.1]
  def change
    create_table :complete_problems do |t|
      t.references :user, foreign_key: true
      t.references :problem, foreign_key: true

      t.timestamps
    end
  end
end
