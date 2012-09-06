class Show < ActiveRecord::Base
  attr_accessible :venue, :date, :time, :city, :address, :picture, :facebook
  has_attached_file :picture, :styles => { :large => "170x120" }
end
