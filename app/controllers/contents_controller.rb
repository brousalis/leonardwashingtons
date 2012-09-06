 class ContentsController < ApplicationController
  before_filter :authenticate
  layout 'admin'

  def index
    @contents = Content.all
    respond_to do |format|
      format.html
    end
  end

  def show
    @content = Content.find_by_id(params[:id])
  end

end
 
