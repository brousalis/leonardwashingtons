class ContactMailer < ActionMailer::Base

  default :from => "noreply@youdomain.dev"
  default :to => "theleonardwashingtons@gmail.com"

  def new_message(message)
    @message = message
    mail(:subject => "#{message.subject}")
  end

end
