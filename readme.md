#VUE JS 2.1.3 - Code Samples

Live Code: http://www.claudegauthier.net/demos/VUEJS/

The purpose of this repository is to store code samples of Vue JS apps.  This is a new library for me and I've decided to learn it, because I believe it is better than Angular, Angular 2 and React JS.

Easier to learn and actually better overall performance than any of these libraries I've mentioned.

Also, no need for TypeScript.

The code samples are based on what I read and what I'm creating out of that reading. I'm adding my personal touch in many of them in order to make them more effective as tools for learning and referencing.

The live code website allows you to view all of these code samples and try them out.  When the list is unfiltered, you get them in a progressive order, recommended for learning.
 
Note: Not all the examples work with IE11, but they all work with Chrome and Firefox on Windows 7/10 respectively and also work with Microsoft Edge on Windows 10.

Note: anything prefixed bootstrap includes jQuery because of bootstrap.min.js

New additions and modifications will be done on a regular basis.


## Some notes about Vue JS

The one aspect of Vue JS I do NOT like is that just like React JS, you mix JS and HTML in the code.

I've worked at trying to separate those concerns:  see simple_grid_component, grid_presentations and grid_presentations_enhanced and look at how the code is structured.

These code samples uses RequireJS and other libraries to bootstrap and start an app.

I will admit, I've yet used Webpack and other tools work at scaffolding Vue JS, but from what I've read, none of them separate JS and HTML files for coding and file organization.

So, once I've done a good review of the tools available, if I find them lacking in the ability to keep structure code, I will code my own tools for scaffolding development environments and building apps.  The code from those 3 samples I've listed will be a good starting point for me to work from.


## Timeline

### 12/15/2016 grid_presentations_row_editing (update)

Local inline editing is now working.

I basically added a '._id' key to the row data which allows me to easily figure out where I am when I edit, this is because
this '._id' is being used for all input fields. Also, each row has an ID, this is dormant, but will later allow for all kinds of row based manipulation.

Note: Faculty is being ignored for now, will have to get to it later

Note: The data is NOT persisted to any service, but that's merely extending the saveRowEditing function in Grid.js


### 12/15/2016 grid_presentations_row_editing

Finally getting to do inline editing, this is work in progress

I took a page from ExtJS on this in that what I do is I to add custom keys to the data.

```
    created: function() {
        var app = this;
        axios.get('data.json').then(function(response) {
            
            // setting edit mode by default to false 
            // to be able to toggle single row editing
            var data = response.data.data;
            var x, l = data.length
            if(l) {
                for(x = 0; x < l; x++){
                    data[x]._rowEdit = false;
                }
            }
            app.gridData = data;                        
        }).catch(function(error) {
            alert('error');
        });
    }
```

for every row, I add ._rowEdit = false;

Now, when we are editing we cannot

-  sort
-  filter
-  toggle another row to edit

Once you are editing, you can either
-  cancel
-  save

The save part is not yet implemented.

Note: I need to deal with the Faculty field, which is a special type of editing.


### 12/15/2016 bootstrap_event_methods_computed_vote_app (UPDATED from 12/15/2016)

I've decided to take out the keyup delete event from the input tag and used an addEventListener on created instead to attach it to the entire window.

This way, it makes more sense, press delete no matter where you are and it will reset the vote app, much more real-world

Of course, the event isn't normalized, meaning that depending the browser, I could possibly run into some issues.

Note: I only tested this in Chrome for Windows on Windows 7 for now.  


### 12/15/2016 bootstrap_event_methods_computed_vote_app (UPDATED from 12/14/2016)

Well, I've learned 2 new things.

1) data can be a function, which is good to know, since you could be modifying anything on-the-fly prior to setting it up.

2) the mounted event is the right place to initialize, just need to create methods to do so.


So, the issue of not being able to dynamically initialize the popular property is solved, I don't rely on watch values, instead, I just created a method which I could bind the view and pass data

Here's what I did

1) modified watch as follows:

```
    app.$watch('updateVote', function(newVal, oldVal) {
        setPopular.call(this, this.voteStatus);
    });
    
    function setPopular(voteStatus) {
        if(voteStatus.length == 0) {
            this.popular = "No Votes Yet! Stay Tuned!";
            return;
        }
        if(voteStatus === "tie") {
            this.popular = "It's a tie!";
            return;
        }
        if(voteStatus === "partial") {
            this.popular = "It's a tie between: " + this.voteGroup;
            return;
        }
        if(voteStatus === "leading") {
            this.popular = "The Leading Food Vote is for: " + this.voteGroup;
        }
    }

```
2) added the mounted event

```
        mounted: function() {
            setPopular.call(this, "");
        }

```

3) popular is an empty string in data

```
    popular: "",

```

It all works, when popular is updated, Vue JS updates the message! :)


Note: if you find that the sorting of the vote list is annoying, well, join the club, but this is for learning, so, keep that in mind! :)


### 12/14/2016 added bootstrap_computed_properties and bootstrap_event_methods_computed_vote_app

Furthering my education.  The bootstrap_event_methods_computed_vote_app raised an interesting question.

How do I get to initialize a state dynamically?  I have this variable in data called popular which is a message.

I wanted this message to be initialized based on the watch property updateVote.

I thought I could do so in the mounted event function, such as this:


```
mounted: function() {
	this.updateVote++
}
```
and then since updateVote is being watched, I figured, this would take care of setting up the message, but it didn't work.


So, for now, I've just set popular with a string.  But I will have to revisit this at some point, when I do figure out this issue, because that's a real world concern.




### 12/11/2016 index.html page of the repo 

The algorithm which creates the filters breaks down all search words by space " ".  So if I need to keep 2 words together, I can use the "_" underscore character.

But it looks ugly in the list, so I added a setLabel() method in the checkbox-template component which strips "_" for " ".


### 12/11/2016 code_samples/grid_with_filter_and_row_editing 

This is work in progress, there is a gear icon (which I will change), but editing isn't functional at this point.

The roadmap for this one is to do inline-editing, where the table cells will turn into textfield at first.

Eventually, this will get more sophisticated, where there may be select input, radio buttons, checkbox(es), etc..  The idea is that all
HTML5 form fields should be usable for editing

### 12/10/2016 - Enhanced the main index.html page

Using VueJS, Bootstrap, etc.. I've enhanced the page not only to look better, but to be able to filter the demo based on search keys.

Each entry in data.json contains a search string along with a text string which is used to build the link.

all of these search strings are combined together and then they are placed in arrays and filtered out for unique values.

This is then used by the template engine in creating a list of checkboxes.

I figured this would be helpful in trying to get to a specific directive or topic of interest.

That intro is pretty verbose, so, one can hide it.

Note: I will eventually get localStorage on this to keep and retrieve some of the parameters.



## Vue JS Notes

### v-show

&lt;template&gt; and v-show do not mix

v-show always renders an element in the dom, it toggles the CSS display property

### v-if

Element with v-if do not remain in the DOM

### v-else

you need a v-if before a v-else

### v-if vs v-show

v-if has a higher toggle cost
v-show has a higher initial render cost

if you don't toggle something very often, use v-if

### v-on shortcut

v-on:click=""

and 

@:click="" 

are identical 

### v-on event modifier

to prevent default on click you can do this: 

@click.prevent="your method"

or 

v-on:click.prevent="your method"

on a form you can do @submit.prevent="your method"

There are 5 event modifiers: .prevent, .stop, .capture, .self and .once

### v-on key modifiers

@keyup.13="calculate" or @keyup.enter="calculate" 

most common keycodes

.enter, .tab, .delete, .esc, .space, .up, .down, .left, .right


### v-model

coercing data type can be done using v-model.number string, etc...

so, you could coerce a property like this

v-model.number="thisnum"

### v-bind shortcut

v-bind:class="thisclass"

or

:class="thisclass"

are both identical

