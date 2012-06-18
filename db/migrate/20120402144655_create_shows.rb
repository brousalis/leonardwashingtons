class CreateShows < ActiveRecord::Migration
  def up
    create_table :shows do |t|
      t.string :venue
      t.datetime :date
      t.string :address
      t.timestamps
    end
  end
end
