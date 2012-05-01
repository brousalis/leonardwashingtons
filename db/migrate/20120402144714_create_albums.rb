class CreateAlbums < ActiveRecord::Migration
  def up
    create_table :albums do |t|
      t.string :itunes
      t.string :amazon
      t.string :soundcloud
      t.string :name
      t.string :released
      t.timestamps
    end
  end
end
