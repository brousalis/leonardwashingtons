class NewsletterController < ApplicationController
  def create
    @email = params[:email]
    @mailchimp = Hominid::API.new('835b538b7ad3d901753f78eecacd7aad-us4')

    @mailchimp.list_subscribe('7d3249f50f', @email)
    sent = @mailchimp.campaign_send_test('06203f236a', [@email])
    logger.info "sent #{sent}"

    respond_to do |format|
      if sent
        format.json {
          render :json => {"status" => "success"} 
        }
      elsif
        format.json {
          render :json => {"status" => "fail"} 
        }
      end
    end 
  end
end
