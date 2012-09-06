 class ShowsController < ApplicationController
  before_filter :authenticate
  layout 'admin'

  def index
    @shows = Show.all
    @show = Show.new
    respond_to do |format|
      format.html
    end
  end

  def create
    show = Show.new(params[:show])
    show.date = params[:date].to_date
    respond_to do |format|
      if show.save
        format.html { redirect_to('/shows',
                      :notice => 'Show was successfully added.') }
      else
        format.html { redirect_to('/shows',
                      :notice => show.errors.full_messages) }
      end
    end 
  end

  def destroy
    @show = Show.find(params[:id])
    @show.destroy
    respond_to do |format|
      format.html { redirect_to('/shows',
                    :notice => 'Show was removed.') }
    end 
  end
end 
