class RemovePosition < ActiveRecord::Migration
  def up
    remove_column :slides, :position
  end

  def down
  end
end
