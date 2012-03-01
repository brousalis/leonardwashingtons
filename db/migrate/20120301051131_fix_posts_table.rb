class FixPostsTable < ActiveRecord::Migration
  def up
    create_table :posts do |t|
      t.string :name
      t.text :content
      t.string :picture
      t.datetime :date
    end
  end

  def down
    drop_table :posts
  end
end
