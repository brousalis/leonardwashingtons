class AddTimeToShows < ActiveRecord::Migration
  def up
    add_column :shows, :time, :datetime
  end

  def down
  end 
end
