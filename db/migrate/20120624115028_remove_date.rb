class RemoveDate < ActiveRecord::Migration
  def up
    drop_table :posts
    create_table :posts do |t|
      t.string :name
      t.text :content
      t.string :picture
      t.timestamps
    end 

    drop_table :songs
    create_table :songs do |t|
      t.string :name
      t.string :url
      t.timestamps
    end 
 
    drop_table :albums
  end

  def down
    drop_table :posts
  end
end
