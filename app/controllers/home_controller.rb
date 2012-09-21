class HomeController < ApplicationController

  def index
    @posts = Post.find(:all, :order => "created_at DESC")
    @message = Message.new
    @newsletter = Message.new
  end

end
