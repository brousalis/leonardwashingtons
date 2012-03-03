class NewsletterController < ApplicationController

  def create
    @newsletter = Newsletter.new({:email => params[:email],
                                  :updated => Time.now,
                                  :md5 => Digest::MD5.hexdigest("#{@newsletter.email}#{@newsletter.updated}"),
                                 })
    @newsletter.save! if @newsletter.valid?

    #MusicMailer.music_email(@newsletter)

    respond_to do |format|
      format.json {
        render :json => {"status" => "success"} 
      }
    end
  end

end
