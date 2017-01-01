### 11/27/2016 - I've added 018 - Simple Grid Component
This is where I start looking into structuring code and packaging it. 
Although I've not done much research into this aspect of VueJS, so for now, this is really my take on the process, eventually, I wil look into what the pros are doing about this.
I figure I would start by using RequireJS to load my dependencies dynamically.
In VueJS view components are templates which are HTML.  So, I added the Text module (available at requirejs.org) so that I can dynamically load these 'views' and dynamically attached them to a document.body.
There are no controllers per say in VueJS, but for each view component you create in HTML, there will be code for it in JS  and as such I basically associated this as controller code.
Those are also added dynamically using RequireJS.
I'm using axios for Ajax calls, they have a nice promise implementation which works well with VueJS.
