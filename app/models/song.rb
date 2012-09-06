require 'mime/types'

class Song < ActiveRecord::Base
  attr_accessible :title

  has_attached_file :track,
    :url  => "/assets/tracks/:basename.:extension",
    :path => ":rails_root/public/assets/tracks/:basename.:extension"

  validates_attachment_presence :track
  validates_attachment_size :track, :less_than => 10.megabytes, :message => 'filesize must be less than 10 MegaBytes'
  validates_attachment_content_type :track, :content_type => [ 'application/mp3', 'application/x-mp3', 'audio/ogg', 'audio/mpeg', 'audio/mp3' ], :message => 'file must be of filetype .mp3'

  def set_mime_type(data)
    data.content_type = MIME::Types.type_for(data.original_filename).to_s
    self.track = data
  end

  def self.to_list
    arr = []
    self.all.each do |song|
      arr << {:title => song.title,
              :mp3 => song.track.url,
              :ogg => song.track.url}
    end
    arr
  end
end
