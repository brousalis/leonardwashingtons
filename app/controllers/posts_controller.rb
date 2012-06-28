class PostsController < ApplicationController
  layout 'admin'

  def index
    @posts = Post.all
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
    @post = Post.find_by_id(params[:id])
    @markdown = RDiscount.new(@post.content)
    respond_to do |format|
      format.json {
        render :json => {"name" => @post.name, "date" => format_date(@post.created_at), "picture" => @post.picture, "content" => @markdown.to_html }
      }
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
    return datetime.strftime("%d/%m/%Y %l:%m %p")
  end
end
