class AddCityShows < ActiveRecord::Migration
  def up
    add_column :shows, :city, :string
  end

  def down
  end  
end
