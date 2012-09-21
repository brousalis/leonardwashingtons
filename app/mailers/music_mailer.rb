class MusicMailer < ActionMailer::Base
  
  default :from => "theleonardwashingtons@gmail.com"

  def new_message(message)
    @message = message
    mail(:to => message.email, :subject => "Thanks for signing up!")
  end

end
