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
            message: "Hello Friend Welcome"
        },
        methods: {
            reverseMessage: function() {
                this.message = this.message.split(" ").reverse().join(" ");
            }
        }
    });             
    
}