p = Post.new
p.name = "Relix Magazine"
p.picture = "um.png"
p.date = Time.parse("3/03/2012, 1:04 pm")
p.content = <<-eos
This month we're featured in Relix Magazine's monthly compilation cd with a small write-up in their On The Rise section.

Being featured on the same page and cd as Umphrey's McGee feels prett-ay, prett-ay, prett-ay, pretty good. Go pick up a copy and spread the word!
            eos
puts p.content
p.save!
