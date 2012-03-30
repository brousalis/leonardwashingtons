class ApplicationController < ActionController::Base
  protect_from_forgery

  private
  def authenticate
    authenticate_or_request_with_http_basic do |login, password|
      if login == "admin" and password == "r3cycle"
        session[:admin] = true
        true
      else
        false
      end
    end
  end 
end
