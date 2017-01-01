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
            lifecycle: [],
            message: "type here"
        },
        methods: {
            destroyApp: function() {
                this.$destroy();            
            }
        },
        beforeCreate: function() {
            console.log("Before Create");
            // there is no $data object at this point in time, so we cannot push into lifecycle
        },
        created: function() {
            console.log("Created");
            this.lifecycle.push({text: "Created"});
        },
        beforeMount: function() {
            console.log("Before Mount");
            this.lifecycle.push({text: "Before Mount"});
        },
        mounted: function() {
            console.log("Mounted");
            this.lifecycle.push({text: "Mounted"});
        },
        beforeUpdate: function() {
            console.log("Before Update");
            // if we try and push into our data/lifecycle, we end up causing an infinite loop
        },
        updated: function() {
            console.log("Updated");
            // if we try and push into our data/lifecycle, we end up causing an infinite loop
        },
        beforeDestroy: function() {
            console.log("Before Destroy");
            // there will be no $data to push
        },
        destroyed: function() {
            console.log("Destroyed");
            // there will be no $data to push
            document.body.removeChild(this.$el);
        }
    });             
    
    
}