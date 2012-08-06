class Show < ActiveRecord::Base
  attr_accessible :venue, :date, :address, :picture
  has_attached_file :picture, :styles => { :large => "170x120>" }
end
