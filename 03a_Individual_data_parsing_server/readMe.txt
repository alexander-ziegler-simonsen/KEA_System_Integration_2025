# https://blog.back4app.com/alternatives-to-elixir-programming-language/ 

I searched alternative to node, which got me "elixir".
I feel like that is too big of a jump, so I searched alternative to "elixir", which got me the link at line 1 of this file.

Rust is too hard.

Ruby was the lang I picked, since I feel (based on almost nothing) that it will be the easiest on the list to get something fast up and running 

----
ruby links used for this 

https://www.codecademy.com/article/ruby-setup 

windows installer - I picked 3.3.7.1 x64 (with DevKit)
https://rubyinstaller.org/downloads/ 
// windows give you are warring
// this is almost 1 gb


mac install not needed, since it is already on the OS
try this in yout cmd:

type ruby -v


---------
tuts

https://www.codecademy.com/learn/learn-ruby - 9 hours ...... nope
https://www.ruby-lang.org/en/documentation/quickstart/ -
https://www.learnrubyonline.org/ - kind of for kids, but good to get you to learn your ABC fast
https://www.ruby-lang.org/en/documentation/installation/


ruby and vs code 
"Ruby LSP" ... but this is mostly for rails

https://rubygems.org/ - Gems are packages in ruby
----------

start the project - tuts

https://dev.to/deciduously/setting-up-a-fresh-ruby-project-56o4


gem install bundler
// this does not work in Windows-powershell

ruby -v // it gives me this 

C:\Users\kim>ruby -v                    // no.... my user folder is not called Kim
ruby 3.3.7 (2025-01-15 revision be31f993d7) [x64-mingw-ucrt]

--
// you have to restart vs code for ruby to be seen in windows cmd

ruby index.rb // it works

--------
windows notes here

https://rubyinstaller.org/add-ons/devkit.html

ridk install command // what is this ? // note from the future here... this was not the right way to go 
- https://www.reddit.com/r/rubyonrails/comments/hjvukq/comment/fwp6zrp/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
-- https://github.com/oneclick/rubyinstaller2/wiki/The-ridk-tool // so that is what it is 


// C:\Ruby33-x64\bin - this path needs to be added , then we can get "gem" to work
https://www.geeksforgeeks.org/how-to-install-rubygems-in-windows/ // really helpful link here

// after that step, we will reboot vs code
// gem works now

// lets try this ones more
gem install bundler // this did nothing in this local folder, needs to learn more about the tool I just installed

https://help.dreamhost.com/hc/en-us/articles/115001070131-Using-Bundler-to-install-Ruby-gems 

---- 

this does not get install locally, it goes into my global folder...... I do not like that
maybe I needed to install this 
https://rvm.io/