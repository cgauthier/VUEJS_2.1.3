var g = Vue.component('grid', {
  template: '#grid-template',
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {};
    var columnsType = {};
    var filterFieldId = "";
    var filterFields = [];
    var returnObj = {
        sortKey: '',
        filterKeys: {},
        filterFields: []
    };
    this.columns.forEach(function (key) {
      sortOrders[key.field] = 1;
      filterFieldId = 'filterField_' + key.field;
      columnsType[filterFieldId] = {
          type: key.type,
          field: key.field,
          key: key
      }
      
      if(key.type == "data" || key.type == "custom") {           
          returnObj[filterFieldId] = "";
          filterFields.push(filterFieldId);
      }
          
    });
    
    returnObj.sortOrders = sortOrders;
    returnObj.columnsType = columnsType;
    returnObj.filterFields = filterFields;

    return returnObj;
    
  },
  computed: {
    filteredData: function () {
        var data, filterKeys, keyCount, filterKey, sortKey, order, rowValid, itemValid, fieldContent, filterValue;

        function getFilterContent (filterKey, row) {

            var fieldDef = filterKey.fullField;
            var rootFilter = fieldDef.rootFilter;
            var displayField = fieldDef.displayField;
            var filterData = [];
            var rootData = row[filterKey.field][rootFilter];
            var dataRow;
            var x, y, l, ll;
            l = rootData.length;
            ll = displayField.length;
            
            for(x = 0; x < l; x++) {
                dataRow = rootData[x];
                for(y = 0; y < ll; y++) {
                    filterData.push(dataRow[displayField[y]]);
                }
            }
            
            return filterData.join(" ");
        };

        data = this.data;
        filterKeys = this.filterKeys;
        keyCount = getObjectSize(this.filterKeys);
        filterKey = this.filterKey && this.filterKey.toLowerCase(); 
        sortKey = this.sortKey;
        order = this.sortOrders[sortKey] || 1;

        if(keyCount) {
            data = data.filter(function(row) {
                rowValid = true;
                itemValid = true; 
                for(key in filterKeys) {
                    if(filterKeys.hasOwnProperty(key)) {
                        if(filterKeys[key].fullField.type == "custom") {
                            fieldContent = getFilterContent(filterKeys[key], row);
                        }
                        else {
                            fieldContent = row[filterKeys[key].field];
                        }
                        
                        fieldContent = fieldContent.trim();
                        filterValue = filterKeys[key].filterValue.trim();                        
                        
                        if(filterValue) {
                            itemValid = fieldContent.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;                            
                        } else {
                            itemValid = true;
                        }
                        
                        
                    }
                    if(!itemValid) {
                        rowValid = false;
                    }
                }
                return rowValid;
            });
        } else {
            data = this.data;
        }
        
        if (sortKey) {
            data = data.slice().sort(function (a, b) {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
            })
        }
        return data
    }
  },
  methods: {
    sortBy: function (key) {
        var sortKey;

        if(this.columnsType[key].type == "data") {
            this.sortKey = this.columnsType[key].field;
            // sortKey = this.sortOrders[key] * -1;
            sortKey = this.sortOrders[this.sortKey] * -1;
            this.sortOrders[this.sortKey] = sortKey; 
        }
    },
    resetFields: function() {
        var fields = this.filterFields;
        var x, l = fields.length;
        var field;
       
        if(l) {
            for(x = 0; x < l; x++) {
                this[fields[x]] = "";
            }
        }
    }
  },
  mounted: function() {
    var columnType;
    for (key in this.columnsType) {
        columnType = this.columnsType[key];
        // if(columnType.type == "data" || columnType.type == "custom") {
        if(columnType.type != "edit") {
            this.$watch(key, function(newVal, oldVal) {
                var key = this.key;
                var g = this.grid;
                var columnType = this.columnType;
                
                if(newVal && newVal.length) {
                    if(!g.filterKeys[key]) {
                        g.filterKeys[key] = {};
                    }
                    g.filterKeys[key].filterValue = newVal;
                    g.filterKeys[key].field = columnType.field;
                    g.filterKeys[key].key = key;
                    g.filterKeys[key].fullField = columnType.key; // a bit confusing, will need to refactor, this is to support custom filtering. 
                } else {
                    delete g.filterKeys[key];
                }
                // CG: 11/27/2016
                // this is the trigger, the value isn't used, but without this, we don't get the filter To Work!!
                // hacky, need to figure out why and improve this
                app.searchQuery = Math.random().toString();
                
            }.bind({
                grid: this,
                columnType: columnType,
                key: key
            }));
        }
    }
  }
  
});