class AddFbEvent < ActiveRecord::Migration
  def up
    add_column :shows, :facebook, :string
  end

  def down
  end
end
