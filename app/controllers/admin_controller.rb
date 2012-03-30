class AdminController < ApplicationController
  before_filter :authenticate
  layout 'admin'

  def index
    respond_to do |format|
      format.html
    end
  end
end

