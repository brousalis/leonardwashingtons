# content keys
about_us = Content.create(:name => "about_us",
                          :content => "With the core of the group forming in 2005, The Leonard Washingtons have spent the better part of six years refining a sound that they still can't quite put a finger on. Each member is an independent musician in their own right, a trait that is apparent in the constant and indiscriminate meshing of styles and influences in live shows and original compositions. While their goal is common, the way they play together is anything but.")

our_sound = Content.create(:name => "our_sound",
                           :content => "A raw mix of hip-hop based funk, jazz harmonies, and a tendency to reference a highly eclectic mix of influences. Mark Stalcup put it quite eloquently: \"Think the solo songs of Steely Dan's Donald Fagen meets The Roots, sung by a funkier John Mayer channeling Winwood. A moment later, it's a hoarser Jack Johnson fronting the Meters, covering a mash-up of Dave Brubeck, Isaac Hayes and Phish.")

# message from billy
p = Post.new
p.name = "Relix Magazine"
p.picture = "um.png"
p.date = Time.parse("11/11/2011, 8:11 am")
p.content = <<-eos
This month we're featured in Relix Magazine's monthly compilation cd with a small write-up in their On The Rise section.

Being featured on the same page and cd as Umphrey's McGee feels prett-ay, prett-ay, prett-ay, pretty good. Go pick up a copy and spread the word!
            eos
p.save! 

# relix post
p = Post.new
p.name = "A Message From Billy"
p.picture = "billy.png"
p.date = Time.parse("3/03/2012, 1:04 pm")
p.content = <<-eos
Dear friends, Lenny Washingtonians, countrymen, lend me your ears...

Hope this message finds you all in good health and humor.

I'm writing to you from the future.

Unless you're living in Japan also, in which case I'm writing to you in the present.

I'm two months into my gig here in Miyazaki on the southern island of Kyushu. It's been a fantastic experience for my girl Hannah and me. Meeting great people, seeing beautiful sights, and mowing down plates of sushi. Next week, we'll have the opportunity to perform for some world class golfers (and for several beer-drinking caddies) when the Dunlop Phoenix Tournament kicks off at the Seagaia Resort where we work. Past winners Tom Watson, Thomas Bjorn, and Edoardo Molinari, as well as US Open Champion Graeme McDowell will all be here.

As great as it is to get paid to play music all over the world, I'm already looking forward to being home in March. I want to give my most sincere thanks to everyone who helped us on our quest to perform at SXSW '12 in Austin. That would be a dream come true for all of us, and I want to personally thank you all for your support and benevolence.

Hannah and I are working six nights per week, four sets a night, and adding new tunes to our repertoire, so I haven't devoted adequate time to songwriting while we've been here. I plan to change this now that the weather is getting cooler, and we'll be spending more time at home. Living overseas has certainly opened my eyes and broadened my mind, and I hope this manifests itself in the form of more mature and refined lyrics and song structures.

Well, it's noon on Thursday in Indiana as I write this, but it's 2 am Friday morning here, so that's all for now. Please don't be strangers, we'll be back playing shows in a few short months, and finishing up our first full-length studio album. Keep us in your hearts and in your iTunes library.

All the best,

Billy Big Lips
            eos
p.save! 
