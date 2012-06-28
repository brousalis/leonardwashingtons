class Song < ActiveRecord::Base
  attr_accessible :title, :mp3, :ogg

  def self.to_list
    arr = []
    self.all.each do |song|
      arr << {:title => song.title,
              :mp3 => song.mp3,
              :ogg => song.ogg}
    end
    arr
  end
end
