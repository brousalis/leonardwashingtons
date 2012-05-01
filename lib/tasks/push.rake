require 'net/ssh'

desc "push to heroku"
task :p => :environment do
  puts '* Pushing to Github and Heroku'
  puts `git add .`
  puts `git commit -m "#{ENV['m']}" .`
  puts `git push origin master`
  puts `git push heroku master`
end

desc "Deploy site to production"
task :deploy => :environment do
  host        = '174.120.254.130'
  user        = 'theleona'
  options     = {}
  remote_path = '~/leonards'

  puts '* Pushing to Github'
  puts `git add .`
  puts `git commit -m "#{ENV['m']}" .`
  puts `git push origin master` 

  puts '* Deploying to production'
  commands = [
    "cd #{remote_path} && git fetch",
    "cd #{remote_path} && git reset --hard origin/master",
    "cd #{remote_path} && bundle install",
    "cd #{remote_path} && rake assets:precompile",
    "cd #{remote_path} && touch tmp/restart.txt"
  ]

  Net::SSH.start(host, user, options) do |ssh|
    commands.each { |c| puts ssh.exec!(c) }
    ssh.loop
  end
end 
