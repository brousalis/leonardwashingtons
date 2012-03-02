class NewsletterController < ApplicationController
  def create
    @email = params[:email]
    @mailchimp = Hominid::API.new('835b538b7ad3d901753f78eecacd7aad-us4')

    subscribed = @mailchimp.list_subscribe('7d3249f50f', @email)
    sent = @mailchimp.campaign_send_test('06203f236a', [@email]) if subscribed

    respond_to do |format|
      if sent
        format.json {
          render :json => {"email" => @email } 
        }
      elsif
        format.json {
          render :json => {"email" => @email } 
        }
      end
    end 
  end
end
