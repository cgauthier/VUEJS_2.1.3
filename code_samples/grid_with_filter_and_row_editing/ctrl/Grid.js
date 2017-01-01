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
          field: key.field
      }
      
      if(key.type == "data") {           
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
        var data = this.data;
        var filterKeys = this.filterKeys;
        var keyCount = getObjectSize(this.filterKeys);
        var filterKey = this.filterKey && this.filterKey.toLowerCase(); // dormant, to be removed;

        var sortKey = this.sortKey;
        var order = this.sortOrders[sortKey] || 1;

        if(keyCount) {
            data = data.filter(function(row) {
                var rowValid = true;
                var itemValid = true; 
                for(key in filterKeys) {
                    if(filterKeys.hasOwnProperty(key)) {
                        itemValid = String(row[filterKeys[key].field]).toLowerCase().indexOf(filterKeys[key].filterValue.toLowerCase()) > -1;
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
        if(columnType.type == "data") {
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