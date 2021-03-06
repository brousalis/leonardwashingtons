class PostsController < ApplicationController
  before_filter :authenticate, :except => :show
  layout 'admin'

  def index
    @posts = Post.find(:all, :order => "created_at DESC")
    respond_to do |format|
      format.html  
      format.json  { render :json => @posts }
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html  { redirect_to('/posts',
                      :notice => 'Post was successfully updated.') }
      else
        format.html  { render :action => "edit" }
      end
    end
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(params[:post])
    respond_to do |format|
      if @post.save
        format.html  { redirect_to('/posts',
                      :notice => 'Post was successfully created.') }
      else
        format.html  { render :action => "new" }
      end
    end
  end

  def show
    @post = Post.find(params[:id])
    respond_to do |format|
      format.js {}
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    respond_to do |format|
      format.html  { redirect_to('/posts',
                    :notice => 'Post was successfully updated.') }
    end
  end

  private

  def format_date(datetime)
    return datetime.strftime("%m/%d/%Y %l:%m %p")
  end
end
