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
            text: "",
            emptyText: true
        },
        methods: {
            "clearField": function( ) {
                this.text = "";
            },
            "doSomething": function( ) {
                alert(this.text);
            }
        }
    });  
    
    app.$watch('text', function(newVal, oldVal) {
        this.emptyText = !this.text.length;
    });

}