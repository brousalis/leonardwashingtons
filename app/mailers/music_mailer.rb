class MusicMailer < ActionMailer::Base
  def music_email(newsletter)
    mail(:to => newsletter.email, :subject => "Thanks for signing up!")
  end

end
