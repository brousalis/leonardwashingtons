class PostsController < ApplicationController
  def show
    @post = Post.find_by_id(params[:id])
    @markdown = RDiscount.new(@post.content)
    
    respond_to do |format|
      format.json {
        render :json => {"name" => @post.name, "date" => format_date(@post.date), "picture" => @post.picture, "content" => @markdown.to_html }
      }
    end
  end

  private

  def format_date(datetime)
    return datetime.strftime("%d/%m/%Y %l:%m %p")
  end 
end
