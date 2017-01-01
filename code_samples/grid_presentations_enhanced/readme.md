### 12/02/2016 - grid presentations enhanced

I've added some modifications to the structure of the code and enhanced the CSS.

This grid is an improvement over the last one, better CSS

But it has a lot of work left to do

1.	adding scrolling to tbody
2.	on Mac Chrome the filter input loose their border-radius format, for unexplained reasons, which is why this current has only a border-format.
3.	need to implement a sorting mechanism for faculty field "type: custom" so that it could have a custom Sort callback attached;
4.	filtering needs a better abstraction for field "type: custom", there is one now, but it's work in progress
5.	have the grid layout anchor itself in height to its container


### 12/02/2016 - grid presentations enhanced

Experimenting with display: flex, WIP

### 12/03/2016 - grid presentations enhanced

Improved filtering, dealing with " " empty space being passed in filters

Still need to deal with having boxes which flex correctly, trying to avoid using JavaScript resize event.

