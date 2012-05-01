class CreateContents < ActiveRecord::Migration
  def up
    create_table :contents do |t|
      t.string :name
      t.text :content
      t.has_attached_file :pic
      t.timestamps
    end
  end
end
