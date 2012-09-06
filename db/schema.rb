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

ActiveRecord::Schema.define(:version => 20120814023029) do

  create_table "contents", :force => true do |t|
    t.string   "name"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
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
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "shows", :force => true do |t|
    t.string   "venue"
    t.datetime "date"
    t.string   "address"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "picture_content_type"
    t.string   "picture_file_name"
    t.string   "facebook"
    t.datetime "time"
    t.string   "city"
  end

  create_table "slides", :force => true do |t|
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "picture_content_type"
    t.string   "picture_file_name"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
  end

  create_table "songs", :force => true do |t|
    t.string   "title"
    t.string   "mp3"
    t.string   "ogg"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "track_file_name"
    t.string   "track_content_type"
    t.integer  "track_file_size"
    t.datetime "track_updated_at"
  end

end
