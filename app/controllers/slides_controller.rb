class SlidesController < ApplicationController
  before_filter :authenticate
  layout 'admin'

  def index
    @slides = Slide.all
    @slide = Slide.new
    respond_to do |format|
      format.html
    end
  end

  def new 
    @slide = Slide.new
  end

  def create
    @slide = Slide.new(params[:slide])
    respond_to do |format|
      if @slide.save
        format.html  { redirect_to('/slides',
                      :notice => 'Slide was successfully added.') }
      else
        format.html  { render :action => "new" }
      end
    end 
  end

  def destroy
    @slide = Slide.find(params[:id])
    @slide.destroy
    respond_to do |format|
      format.html  { redirect_to('/slides',
                    :notice => 'Image was deleted.') }
    end 
  end
end
