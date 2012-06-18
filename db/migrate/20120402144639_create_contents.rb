class CreateContents < ActiveRecord::Migration
  def up
    create_table :contents do |t|
      t.string :name
      t.text :content
      t.timestamps
    end
  end
end
