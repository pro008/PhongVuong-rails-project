class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
    	t.integer :user_id
    	t.string :name
      t.integer :progress, default: 0
      t.integer :priority

      t.timestamps
    end
  end
end
