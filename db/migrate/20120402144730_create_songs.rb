class CreateSongs < ActiveRecord::Migration
  def up
    create_table :songs do |t|
      t.belongs_to :album
      t.string :name
      t.string :length
      t.timestamps
    end
  end
end
