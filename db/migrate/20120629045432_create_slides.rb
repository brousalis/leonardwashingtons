class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.has_attached_file :picture
      t.integer :position
      t.timestamps
    end
  end
end
