# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120402144730) do

  create_table "albums", :force => true do |t|
    t.string   "itunes"
    t.string   "amazon"
    t.string   "soundcloud"
    t.string   "name"
    t.string   "released"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contents", :force => true do |t|
    t.string   "name"
    t.text     "content"
    t.string   "pic_content_type"
    t.datetime "pic_updated_at"
    t.string   "pic_file_name"
    t.integer  "pic_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "newsletters", :force => true do |t|
    t.string   "email"
    t.datetime "updated"
    t.string   "md5"
  end

  create_table "posts", :force => true do |t|
    t.string   "name"
    t.text     "content"
    t.string   "picture"
    t.datetime "date"
  end

  create_table "shows", :force => true do |t|
    t.string   "venue"
    t.datetime "date"
    t.string   "address"
    t.string   "pic_content_type"
    t.datetime "pic_updated_at"
    t.string   "pic_file_name"
    t.integer  "pic_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "songs", :force => true do |t|
    t.integer  "album_id"
    t.string   "name"
    t.string   "length"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
