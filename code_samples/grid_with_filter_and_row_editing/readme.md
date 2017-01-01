### 11/27/2016 - I've added Grid with Filter and Row Editing
This is based from 018 - Simple Grid Component
#### I've added font-awesome as a resource
The following are some of the objectives I've set for this sample code.

1.	include a third column which will be an action to edit (work in progress)
	* the column is added (done)
	* the font-awesome is used to display the icon (done)
	* generic action (not-done)
	
2.	use font-awesome to display asc/desc icon (done)

3.	in-line filter for each column (done)
	* the fields are added
	* the filtering is working correctly
	* added a reset button to clear the fields

4.	The real action for the 3rd column is to edit the content of that row providing a UI editor. (not-done)

5.	provide sorting across columns (an AND operation) (done)

6.	scroll within the rows and keep the header separate (done)
	* it's a bit hacky, I've done it using CSS, but what will be nice is to do this in a way where the CSS sets itself dynamically
	* it would be nice to detect the scrollbar and adjust the last column and the table dynamically for its width, something to add to the bucket list

7.	fix the asc/desc arrow format (not done)

8.	delete a row (not done, not required yet, but will get it working)

9.	better column control via configuration (not done)
	* width
	* alignment
	* styles
	* custom data rendering


So, this project is currently work in progress, once it is completed, I will be able to use this for another project I need to do.
