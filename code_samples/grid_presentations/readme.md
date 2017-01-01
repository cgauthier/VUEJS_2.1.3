### 12/01/2016 - I've added Grid Presentations
This is based from 019 - Grid with Filter and Row Editing

1.	the table is now 100% and is set to table-layout: fix (temporary)

2.	scrolling is gone for now, I will have to work on getting this back, have to change the layout to flex and do some CSS and JavaScript coding (needs to be done)

3. the ability to set custom data is enabled see Faculty column. (see below the data, the code and the template to support this)

```
"faculty": {
	"key": "a0305dfd-30a7-4743-8b59-9fa92385cd18",
	"data": [{
		"name": "Lawrence Boza",
		"role": "Speaker"
	}]
}

{ title: "Faculty",      field: "faculty",       type: "custom",     cls: "faculty" }

<tr v-for="entry in filteredData">
	<td v-if="key.type!='custom'" v-for="key in columns" :class='key.cls'>
		{{ (key.type == "data" ) ?  entry[key.field] : "" }}<span v-if="key.type=='action'" v-bind:class="{'fa-cog fa':key.field =='edit'}"></span>
	</td>
	<td v-else >
		<div v-if="key.field='faculty'" v-for="item in entry.faculty.data">
			{{ item.name }}
		</div>
	</td>
</tr>
```

4.	Sorting on Faculty is broken because the current algorithm doesn't support the object data structure (needs to be fixed)

5.	Filtering on Faculty is broken because the current algorithm doesn't support the object data structure (needs to be fixed)

6.	CSS format isn't yet as per specs.

7.	We now have custom CSS for columns


### 12/02/2016 - Grid Presentations

1.	the table is now 100% and is set to table-layout: fix (temporary)

2.	scrolling is gone for now, I will have to work on getting this back, have to change the layout to flex and do some CSS and JavaScript coding (needs to be done)

3. the ability to set custom data is enabled see Faculty column. (see below the data, the code and the template to support this)

```
"faculty": {
	"key": "a0305dfd-30a7-4743-8b59-9fa92385cd18",
	"data": [{
		"name": "Lawrence Boza",
		"role": "Speaker"
	}]
}

{ title: "Faculty",      field: "faculty",       type: "custom",     cls: "faculty",    rootFilter: "data", displayField: ["name" ] },

<tr v-for="entry in filteredData">
	<td v-if="key.type!='custom'" v-for="key in columns" :class='key.cls'>
		{{ (key.type == "data" ) ?  entry[key.field] : "" }}<span v-if="key.type=='action'" v-bind:class="{'fa-cog fa':key.field =='edit'}"></span>
	</td>
	<td v-else >
		<div v-if="key.field='faculty'" v-for="item in entry.faculty.data">
			{{ item.name }}
		</div>
	</td>
</tr>
```

4.	Sorting on Faculty is broken because the current algorithm doesn't support the object data structure (needs to be fixed)

5.	Filtering on Faculty field is working, Filtering on custom columns has been improved.  For now, here's the design

```
if(filterKeys[key].fullField.type == "custom") {
    fieldContent = getFilterContent(filterKeys[key], row);
}
else {
    fieldContent = row[filterKeys[key].field];
}
itemValid = String(fieldContent).toLowerCase().indexOf(filterKeys[key].filterValue.toLowerCase()) > -1;

```	

A new function getFilterContent works based from two new keys in the grid defition, rootFilter and displayField.
displayField is an array, so it can allow for some interesting display gymastics, but within the Grid.html template
displayField is NOT currently being used, that will be a future iteration.
However, its also used for filtering, knowing
which keys to use from the array of JSON passed to the getFilterContent.
This is still in flux, I have to do some more design on this aspect, but now, we have decent filtering on an object from a JSON.
	

6.	CSS format isn't yet as per specs.

7.	We now have custom CSS for columns
