var scope = {
    window: window,
    Vue: Vue
};

window.onload = launch.bind(scope);

function launch() {
    var V = this.Vue;
    var window = this.window;
    
    var app = new V({
        el: '#app',
        data: {
            links: [],
            visible: false,
            showHideButton: "Show Info",
            filtersList: [],
            filterCriteriaArr: []
            
        },
        computed: {
            filteredLinks: function() {
                var links = this.links;
                var filtersArr = this.filterCriteriaArr;
                if(filtersArr && filtersArr.length) {
                    links = links.filter(function (row) {
                        var x, l = filtersArr.length;
                        var searchStr = row.search.toLowerCase();
                        var foundArr = [];
                        for(x = 0; x < l; x++) {
                            if(searchStr.indexOf(filtersArr[x]) != -1) {
                                foundArr.push(true)
                            }
                        }
                        if(foundArr.length == l) {
                            return true;
                        }
                        return false;
                   })
                   
                    links = links.sort(function(a, b) {
                        if(a.text < b.text) {
                            return -1;
                        }
                        if(a.text > b.text) {
                            return 1;
                        }
                        return 0;
                    });
                }
                
                
                return links;                
                
            }
        },
        methods: {
            showAll: function() {
                this.filterCriteriaArr = [];
                var checkboxes = document.body.getElementsByClassName('filter-checkbox');
                var x, l = checkboxes.length;
                for(x = 0; x < l; x++) {
                    checkboxes[x].checked = false;
                }
            },
            buildLink: function(v) {
                return "code_samples/" + v.text + "/index.html";
            },
            setVisible: function() {
                this.visible = !this.visible
                if(this.visible) {
                    this.showHideButton = "Hide Info"
                } else {
                    this.showHideButton = "Show Info"
                }
            },
            createUniqueFilterList: function() {
                
                function uniqueItem(value, index, self) {
                    return self.indexOf(value) === index;
                }
                
                var fullStrArr = [], temp, tempArr, tempStr, uniqueArr, x, l;
                for(row in this.links) {
                    temp = this.links[row].search;
                    tempArr = temp.split(" ");
                    l = tempArr.length;
                    for(x = 0; x < l; x++) {
                        tempStr = tempArr[x].trim();
                        if(tempStr) {
                            fullStrArr.push(tempStr.toLowerCase());
                        }
                    }
                }
                              
                uniqueArr = fullStrArr.filter(uniqueItem);
                this.filtersList = uniqueArr.sort();
                
            }
        },
        created: function() {
            var app = this;
            axios.get('data.json').then(function(response) {
                app.links = response.data.data;
                app.createUniqueFilterList();
                
            }).catch(function(error) {
                alert('error');
            });
        }
    });
 
    V.component('checkbox-template', {
        props: ['filterItem'],
        methods: {
            setArray: function(e) {
                var app = this;
                var val = e.srcElement.value;
                var checked = e.srcElement.checked;
                
                if(checked) {
                    if(app.filterCriteriaArr.indexOf(val) == -1) {
                        app.filterCriteriaArr.push(val);    
                    }
                } else {
                    app.filterCriteriaArr = app.filterCriteriaArr.filter(function(item) {
                        return item !== val;
                    })
                }
            }.bind(app),
            setLabel: function(val) {
                return val.replace(/_/gi, " ");
            }
        },
        template: '<span class="filter-item"><input type="checkbox" class="filter-checkbox" v-on:click="setArray" :value="filterItem" :id="filterItem" name="filterCheckboxes">&nbsp;<label :for="filterItem">{{setLabel(filterItem)}}</label>'
    });    

    // CG: 12/10/2016
    // this is the trigger, but we don't need to do anything
    // probably could do this better, need to check online why I'm doing this
    // and how to improve this
    app.$watch('filterCriteriaArr', function(newVal, oldVal) {
        
    });                 
}