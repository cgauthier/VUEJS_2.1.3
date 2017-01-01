// access the text plugin
require.config({
    paths: {
        text: '../../js_libs/text-2.0.15/text'
    }
});
// needs to be a global because we will be loading views dynamically.
var Vue, domReady, axios, app;

// load the required libraries
requirejs([
        '../../js_libs/domReady-2.0.1/domReady', 
        '../../js_libs/vue-2.1.3/dist/vue.js', 
        '../../js_libs/axios-0.15.2/dist/axios.js'
    ], function(dR, V, a) {
        Vue = V;
        domReady = dR;
        axios = a;
        
        // load the various vue components 
        requirejs(['text!view/Grid.html'], function(grid) {
            var p = new DOMParser();
            var n = p.parseFromString(grid, 'text/html');
            document.body.appendChild(n.documentElement);
            
            // load the various vue controllers (there are no such things as vue controllers, but, it is implied)
            requirejs(['ctrl/Grid'], function(grid) {
                
                // this is the main function which executes when the dom is ready
                domReady(function() {

                app = new Vue({
                    el: '#app',
                    data: {
                        searchQuery: '',
                        gridColumns: [
                           { title: "Name",     field: "name",  type: "data",   cls: "name" },
                           { title: "Power",    field: "power", type: "data",   cls: "power" },
                           { title: "",         field: "edit",  type: "action", cls: "edit" }
                        ],
                        gridData: []
                    },
                    created: function() {
                        var app = this;
                        axios.get('data.json').then(function(response) {
                            app.gridData = response.data.data;                        
                        }).catch(function(error) {
                            alert('error');
                        });
                    }
                });
            });
        });
    })
});