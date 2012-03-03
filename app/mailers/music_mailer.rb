class MusicMailer < ActionMailer::Base
  default from: "theleonardwashingtons@gmail.com"

  def music_email(newsletter)
    @newsletter = newsletter
    mail(:to => @newsletter.email, :subject => "Thanks for signing up!")
  end

end
