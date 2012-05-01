class CreateShows < ActiveRecord::Migration
  def up
    create_table :shows do |t|
      t.string :venue
      t.datetime :date
      t.string :address
      t.has_attached_file :pic
      t.timestamps
    end
  end
end
