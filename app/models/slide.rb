class Slide < ActiveRecord::Base
  attr_accessible :picture
  has_attached_file :picture, :styles => { :large => "960x410>" }
end
