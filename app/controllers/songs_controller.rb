class SongsController < ApplicationController
  before_filter :authenticate
  layout 'admin'

  def index
    @songs = Song.all
    @song = Song.new
    respond_to do |format|
      format.html
    end 
  end

  def create
    @song = Song.new(params[:song])

    if params[:song][:track]
      @song.set_mime_type(params[:song][:track])
    end

    respond_to do |format|
      if @song.save
        format.html { redirect_to('/songs',
                      :notice => 'Song was successfully added.') }
      else
        format.html { redirect_to('/songs',
                      :notice => @song.errors.full_messages) }
      end
    end
  end

  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    respond_to do |format|
      format.html  { redirect_to('/songs',
                    :notice => 'Song was deleted.') }
    end 
  end 
end
