class NewsletterController < ApplicationController

  def create
    @newsletter = Newsletter.new(:email => params[:email],
                                  :updated => Time.now,
                                  :md5 => Digest::MD5.hexdigest("#{params[:email]}#{Time.now}")
                                 )
    saved = @newsletter.save! if @newsletter.valid?

    success = MusicMailer.music_email(@newsletter) if saved

    respond_to do |format|
      if success 
        format.json {
          render :json => {"status" => "success",
                           "message" => "<span class='success'>Success!</span> Thank you for signing up. A link to download <span>Miss Massey</span> has been sent to your inbox."}
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
