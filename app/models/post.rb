class Post < ActiveRecord::Base
  attr_accessible :name, :content, :picture
end
