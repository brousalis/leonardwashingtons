class AddNewsletters < ActiveRecord::Migration
  def up
    create_table :newsletters do |t|
      t.string :email
      t.datetime :updated
      t.string :md5
    end
  end

  def down
    drop_table :newsletters
  end 
end
