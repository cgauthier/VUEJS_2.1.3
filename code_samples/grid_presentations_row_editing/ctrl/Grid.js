var g = Vue.component('grid', {
  template: '#grid-template',
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}, 
        columnsType = {}, 
        filterFieldId = "", 
        filterFields = [], 
        returnObj = {
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
    returnObj.edit = true;
    returnObj.isEditing = false;

    return returnObj;
    
  },
  computed: {
    filteredData: function () {
        var data, filterKeys, keyCount, filterKey, sortKey, order, rowValid, itemValid, fieldContent, filterValue;

        function getFilterContent (filterKey, row) {

            var fieldDef = filterKey.fullField,
                rootFilter = fieldDef.rootFilter,
                displayField = fieldDef.displayField,
                filterData = [],
                rootData = row[filterKey.field][rootFilter],
                dataRow,
                x, y, l, ll;
                
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

        if(keyCount && this.isEditing === false) {
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
                        
                        if(typeof fieldContent != "string") {
                            fieldContent = fieldContent.toString();    
                        }
                        
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
    enableRowEditing: function(row) {
        if(this.isEditing === false) {
            row._rowEdit = true;  
            this.isEditing = true;          
        }
    },
    cancelRowEditing: function(row) {
        this.isEditing = false;
        row._rowEdit = false;
    },  
    saveRowEditing: function(row) {
        
        var id = row._id;
        var fieldIdx;
        var inputField
        for(field in row) {
            fieldIdx = field.indexOf('_');
            if(fieldIdx == -1 || fieldIdx > 0) {
                if(row.hasOwnProperty(field)) {
                    inputField = document.getElementById(field + "_" + id);
                    if(inputField) {
                       row[field] = inputField.value; 
                    }
                }
            }
        }
        
        this.cancelRowEditing(row);
        
    },  
    sortBy: function (key) {
        var sortKey;
        // no sorting while we are editing a record
        if(this.isEditing === false) {
            if(this.columnsType[key].type == "data") {
                this.sortKey = this.columnsType[key].field;
                // sortKey = this.sortOrders[key] * -1;
                sortKey = this.sortOrders[this.sortKey] * -1;
                this.sortOrders[this.sortKey] = sortKey; 
            }
        }
    },
    resetFields: function() {
        var fields = this.filterFields,
            x, l = fields.length,
            field;
       
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
                var key = this.key,
                    g = this.grid,
                    columnType = this.columnType;
                
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