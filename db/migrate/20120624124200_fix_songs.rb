class FixSongs < ActiveRecord::Migration
  def up
    drop_table :songs
    create_table :songs do |t|
      t.string :title
      t.string :mp3
      t.string :ogg
      t.timestamps
    end
  end

  def down
  end
end
