class PostsController < ApplicationController
  def show
    @post = Post.find_by_id(params[:id])
    @markdown = Redcarpet::Markdown.new(@post.content)
    
    respond_to do |format|
      format.json {
        render :json => {"name" => @post.name, "date" => @post.date, "picture" => @post.picture, "content" => @markdown.to_html }
      }
    end
  end
end
