class AddPaperclips < ActiveRecord::Migration
  def up
    change_table :shows do |t|
      t.has_attached_file :picture
    end
  end

  def down
  end
end
