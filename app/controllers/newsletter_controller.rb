class NewsletterController < ApplicationController

  def create
    @newsletter = Newsletter.new(:email => params[:email],
                                 :updated => Time.now,
                                 :md5 => Digest::MD5.hexdigest("#{params[:email]}#{Time.now}"))

    success = @newsletter.save! if @newsletter.valid?

    respond_to do |format|
      if success 
        format.json {
          render :json => {"status" => "success",
                           "message" => "<span class='success'>Success!</span> Thank you for signing up! <div><a href='/Miss_Massey.mp3'>Click here to download Miss Massey</a></div>"}
        }
      else
        format.json {
          render :json => {"status" => "fail",
                           "message" => "<span class='fail'>Error!</span> There was a problem signing you up for the newsletter. Please try again."}
        } 
      end
    end
  end

end
